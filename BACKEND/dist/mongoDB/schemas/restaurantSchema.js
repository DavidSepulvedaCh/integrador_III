"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RestaurantSchema = new mongoose_1.Schema({
    idUser: {
        type: String,
        required: true,
        unique: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('restaurants', RestaurantSchema);
