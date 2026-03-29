import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { fileTypeFromFile } from 'file-type';
import { Observable } from 'rxjs';

const PLAIN_TEXT_MIMETYPE = 'text/plain';

interface ModifiedFile {
  fieldname: string;
  mimetype?: string;
  buffer?: Buffer;
  path?: string;
  $ref: () => Express.Multer.File;
  [key: string]: unknown;
}

const getUploadedFilesFromRequestAsMap = async (
  request: Request,
  modifyFileFn: (
    file: Express.Multer.File,
  ) => ModifiedFile | Promise<ModifiedFile> = (file) => ({
    ...file,
    $ref: () => file,
  }),
): Promise<Record<string, ModifiedFile | ModifiedFile[]>> => {
  const uploadedFiles: Record<string, ModifiedFile | ModifiedFile[]> = {};

  const { file, files } = request;
  if (file) {
    const fieldName = file.fieldname;
    uploadedFiles[fieldName] = await modifyFileFn(file);
  } else if (Array.isArray(files)) {
    if (files.length > 0) {
      const fieldName = files[0].fieldname;
      uploadedFiles[fieldName] = await Promise.all(files.map(modifyFileFn));
    }
  } else if (files) {
    await Promise.all(
      Object.entries(files).map(async ([fieldName, filesPerField]) => {
        uploadedFiles[fieldName] = await Promise.all(
          filesPerField.map(modifyFileFn),
        );
      }),
    );
  }

  return uploadedFiles;
};

@Injectable()
export class AddFileUploadToRequestBodyInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<Request>();
    const body = await getUploadedFilesFromRequestAsMap(
      request,
      async (file: Express.Multer.File): Promise<ModifiedFile> => {
        // Check if file has buffer (memory storage) or path (disk storage)
        let mime = file.mimetype || PLAIN_TEXT_MIMETYPE;

        if (file.buffer) {
          // Memory storage - use buffer to detect file type
          try {
            const fileType = await fileTypeFromFile(file.buffer as any);
            mime = fileType?.mime || file.mimetype || PLAIN_TEXT_MIMETYPE;
          } catch {
            // Fallback to original mimetype
            mime = file.mimetype || PLAIN_TEXT_MIMETYPE;
          }
        } else if (file.path) {
          // Disk storage - use path to detect file type
          try {
            const fileType = await fileTypeFromFile(file.path);
            mime = fileType?.mime || file.mimetype || PLAIN_TEXT_MIMETYPE;
          } catch {
            // Fallback to original mimetype
            mime = file.mimetype || PLAIN_TEXT_MIMETYPE;
          }
        }

        return {
          ...Object.assign(file, { mimetype: mime }),
          $ref: () => file,
        };
      },
    );
    Object.assign(request.body, body);
    return next.handle();
  }
}
