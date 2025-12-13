import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("admin/login")
  async adminLogin(
    @Body() loginDto: LoginDto
  ): Promise<{ accessToken: string }> {
    const admin = await this.authService.validateAdmin(
      loginDto.email,
      loginDto.password
    );
    return await this.authService.login(admin);
  }

  @Post("admin/register")
  async adminRegister(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.registerAdmin(
      loginDto.email,
      loginDto.password
    );
  }

  @Post("customer/login")
  async customerLogin() {
    return { message: "Customer login endpoint" };
  }
}
