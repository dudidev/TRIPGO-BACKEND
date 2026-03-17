import { Request, Response } from "express"
import { chatbotIAService } from "../services/iaServices.js"

export const chatbotIA = async (req: Request, res: Response) => {

  try {

    const { mensaje } = req.body

    const resultado = await chatbotIAService(mensaje)

    res.json(resultado)

  } catch (error) {

    res.status(500).json({
      message: "Error en chatbot IA"
    })

  }

}