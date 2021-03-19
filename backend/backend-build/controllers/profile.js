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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserProfile = exports.deleteImage = exports.editImage = exports.uploadImage = exports.getUserProfile = void 0;
var databasePool_1 = __importDefault(require("../databasePool"));
var constants_1 = require("../constants");
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
var multer_1 = __importDefault(require("multer"));
var getUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedJwt, email, userInfoResponse, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                decodedJwt = jwt_decode_1.default(req.cookies.ACCESS_TOKEN);
                email = decodedJwt.subject;
                return [4 /*yield*/, databasePool_1.default.query("SELECT username, avatar_url from user_info WHERE email = $1", [email])];
            case 1:
                userInfoResponse = _a.sent();
                res.send({ profile: userInfoResponse.rows });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserProfile = getUserProfile;
//Guide on uploading image with cloudinary and multer
//https:medium.com/@lola.omolambe/image-upload-using-cloudinary-node-and-mongoose-2f6f0723c745
var cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_secret,
});
var uploadImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var storage, multerUploader, upload;
    return __generator(this, function (_a) {
        storage = new multer_storage_cloudinary_1.CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: "steam/profile",
                format: function (req, file) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, "jpg"];
                }); }); },
            },
        });
        multerUploader = multer_1.default({ storage: storage });
        upload = multerUploader.single("image");
        upload(req, res, function (err) {
            if (err instanceof multer_1.default.MulterError) {
                return res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS);
                // A Multer error occurred when uploading.
            }
            else if (err) {
                // An unknown error occurred when uploading.
                return res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS);
            }
            return res.send({ cloudinaryImagePath: req.file.path });
            // Everything went fine and save document in DB here.
        });
        return [2 /*return*/];
    });
}); };
exports.uploadImage = uploadImage;
var editImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var storage, multerUploader, upload;
    return __generator(this, function (_a) {
        console.log("publicId", req.params.cloudinaryPublicId);
        storage = new multer_storage_cloudinary_1.CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: "steam/profile",
                format: function (req, file) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, "jpg"];
                }); }); },
                public_id: function (req, file) { return req.params.cloudinaryPublicId; },
            },
        });
        multerUploader = multer_1.default({ storage: storage });
        upload = multerUploader.single("image");
        //Unable ot use async await with upload()
        //Wants 3 arguments
        upload(req, res, function (err) {
            if (err instanceof multer_1.default.MulterError) {
                console.log(err);
                return res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS);
                // A Multer error occurred when uploading.
            }
            else if (err) {
                console.log(err);
                // An unknown error occurred when uploading.
                return res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS);
            }
            return res.send({ cloudinaryImagePath: req.file.path });
            // Everything went fine and save document in DB here.
        });
        return [2 /*return*/];
    });
}); };
exports.editImage = editImage;
var deleteImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        cloudinary.uploader.destroy(
        // req.params.cloudinaryPublicId,
        "steam/profile/" + req.params.cloudinaryPublicId, function (err, result) {
            if (err)
                return console.log(err);
            console.log(req.params.cloudinaryPublicId, " deleted");
            res.send(result);
        });
        return [2 /*return*/];
    });
}); };
exports.deleteImage = deleteImage;
var editUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, avatarUrl, decodedJwt, email, userInfoResponse, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.body.username;
                avatarUrl = req.body.cloudinaryImagePath;
                decodedJwt = jwt_decode_1.default(req.cookies.ACCESS_TOKEN);
                email = decodedJwt.subject;
                return [4 /*yield*/, databasePool_1.default.query("UPDATE user_info SET username = $1, avatar_url = $2\n             WHERE email = $3 RETURNING username, avatar_url", [username, avatarUrl, email])];
            case 1:
                userInfoResponse = _a.sent();
                res.send({ profile: userInfoResponse.rows });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editUserProfile = editUserProfile;
