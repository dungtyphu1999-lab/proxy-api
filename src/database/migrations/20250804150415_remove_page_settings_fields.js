"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, knex.schema.alterTable('page_settings', function (table) {
                    // Remove Basic Info
                    table.dropColumn('site_name');
                    table.dropColumn('site_description');
                    table.dropColumn('site_keywords');
                    // Remove favicon_url
                    table.dropColumn('favicon_url');
                    // Remove Social Media Links
                    table.dropColumn('facebook_url');
                    table.dropColumn('telegram_url');
                    table.dropColumn('github_url');
                    table.dropColumn('twitter_url');
                    table.dropColumn('instagram_url');
                    table.dropColumn('youtube_url');
                    table.dropColumn('linkedin_url');
                    // Remove Contact Information
                    table.dropColumn('contact_email');
                    table.dropColumn('contact_phone');
                    table.dropColumn('contact_address');
                    // Remove Website Configuration
                    table.dropColumn('maintenance_mode');
                    table.dropColumn('maintenance_message');
                    // Remove SEO Settings
                    table.dropColumn('meta_title');
                    table.dropColumn('meta_description');
                    table.dropColumn('google_analytics_id');
                    table.dropColumn('google_tag_manager_id');
                    // Remove Footer Settings
                    table.dropColumn('footer_copyright');
                    table.dropColumn('footer_text');
                    // Remove Feature Toggles
                    table.dropColumn('enable_registration');
                    table.dropColumn('enable_user_uploads');
                    table.dropColumn('enable_comments');
                })];
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, knex.schema.alterTable('page_settings', function (table) {
                    // Restore Basic Info
                    table.string('site_name', 255).notNullable().defaultTo('My Website');
                    table.text('site_description').nullable();
                    table.text('site_keywords').nullable();
                    // Restore favicon_url
                    table.string('favicon_url', 500).nullable();
                    // Restore Social Media Links
                    table.string('facebook_url', 500).nullable();
                    table.string('telegram_url', 500).nullable();
                    table.string('github_url', 500).nullable();
                    table.string('twitter_url', 500).nullable();
                    table.string('instagram_url', 500).nullable();
                    table.string('youtube_url', 500).nullable();
                    table.string('linkedin_url', 500).nullable();
                    // Restore Contact Information
                    table.string('contact_email', 255).nullable();
                    table.string('contact_phone', 50).nullable();
                    table.text('contact_address').nullable();
                    // Restore Website Configuration
                    table.boolean('maintenance_mode').notNullable().defaultTo(false);
                    table.text('maintenance_message').nullable();
                    // Restore SEO Settings
                    table.string('meta_title', 255).nullable();
                    table.text('meta_description').nullable();
                    table.string('google_analytics_id', 100).nullable();
                    table.string('google_tag_manager_id', 100).nullable();
                    // Restore Footer Settings
                    table.text('footer_copyright').nullable();
                    table.text('footer_text').nullable();
                    // Restore Feature Toggles
                    table.boolean('enable_registration').notNullable().defaultTo(true);
                    table.boolean('enable_user_uploads').notNullable().defaultTo(true);
                    table.boolean('enable_comments').notNullable().defaultTo(true);
                })];
        });
    });
}
