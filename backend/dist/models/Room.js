var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
let Room = class Room {
    id;
    name;
    capacity;
    equipment_details;
    status;
    imageUrl;
    bookings;
    created_at;
    updated_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Room.prototype, "capacity", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Room.prototype, "equipment_details", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: ['available', 'unavailable', 'maintenance'],
        default: 'available'
    }),
    __metadata("design:type", String)
], Room.prototype, "status", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Room.prototype, "imageUrl", void 0);
__decorate([
    OneToMany('Booking', 'room'),
    __metadata("design:type", Array)
], Room.prototype, "bookings", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Room.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Room.prototype, "updated_at", void 0);
Room = __decorate([
    Entity('rooms')
], Room);
export { Room };
//# sourceMappingURL=Room.js.map