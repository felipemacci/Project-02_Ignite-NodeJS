import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (emailAlreadyExists) {
      throw new AppError("This email already exists!");
    }

    const passwordHash = await hash(data.password, 10);

    await this.usersRepository.create({
      ...data,
      password: passwordHash,
    });
  }
}
