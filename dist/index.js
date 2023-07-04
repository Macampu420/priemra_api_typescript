"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// routes importing
const index_1 = __importDefault(require("./routes/index"));
const port = 3000;
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//routes settings
app.use('/api', index_1.default);
app.listen(port, () => console.log(`app running on port ${port}`));
