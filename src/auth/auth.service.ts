import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, Role } from "../entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async validateAdmin(email: string, password: string) {
    const admin = await this.userRepo.findOne({
      where: { email, role: Role.ADMIN },
    });
  
    if (!admin) {
      throw new UnauthorizedException("Invalid credentials");
    }
    
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      throw new UnauthorizedException("Invalid credentials");
    }
    
    return admin; 
  }
  
  async registerAdmin(email: string, password: string) {
    try {
      const existingAdmin = await this.userRepo.findOne({
        where: { email, role: Role.ADMIN },
      });

      if (existingAdmin) {
        throw new UnauthorizedException("Admin with this email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = this.userRepo.create({
        email,
        password: hashedPassword,
        role: Role.ADMIN,
      });

      await this.userRepo.save(newAdmin);

      return { success: true, message: "Admin registered successfully" };
    } catch (err) {
      return { success: false, message: `Registration failed: ${err}` };
    }
  }

  async login(admin: User) {
    const payload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
