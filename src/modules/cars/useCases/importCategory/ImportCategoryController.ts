import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;

    try {
      this.importCategoryUseCase.execute(file);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.send();
  }
}
