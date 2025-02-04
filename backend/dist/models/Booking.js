var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
let Booking = class Booking {
    id;
    user;
    room;
    date;
    start_time;
    end_time;
    status;
    form_type;
    created_at;
    updated_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    ManyToOne('User', 'bookings'),
    __metadata("design:type", Function)
], Booking.prototype, "user", void 0);
__decorate([
    ManyToOne('Room', 'bookings'),
    __metadata("design:type", Function)
], Booking.prototype, "room", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", Date)
], Booking.prototype, "date", void 0);
__decorate([
    Column({ type: 'time' }),
    __metadata("design:type", String)
], Booking.prototype, "start_time", void 0);
__decorate([
    Column({ type: 'time' }),
    __metadata("design:type", String)
], Booking.prototype, "end_time", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: ['pending', 'rented', 'cancelled'],
        default: 'pending'
    }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: ['internal', 'external'],
        default: 'internal'
    }),
    __metadata("design:type", String)
], Booking.prototype, "form_type", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Booking.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Booking.prototype, "updated_at", void 0);
Booking = __decorate([
    Entity('bookings')
], Booking);
export { Booking };
//# sourceMappingURL=Booking.js.map