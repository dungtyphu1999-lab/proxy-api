declare module 'adm-zip' {
  export interface IZipEntry {
    entryName: string;
    isDirectory: boolean;
    comment?: string;
    attr?: number;
    getData(): Buffer;
  }

  export default class AdmZip {
    constructor(pathOrBuffer?: string | Buffer);
    getEntries(): IZipEntry[];
    getEntry(entryName: string): IZipEntry | null;
    addFile(entryName: string, data: Buffer): void;
    addFile(entryName: string, data: Buffer, comment?: string, attr?: number): void;
    writeZip(targetFileName: string): void;
  }
}
