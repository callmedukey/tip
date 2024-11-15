'use server'

import { ContactFormSchema } from "@/definitions/zod"
import { sendEmailInstance, staffEmailTemplate } from "@/lib/brevo"
import prisma from "@/lib/prisma"
import { z } from "zod"



export const sendContactForm = async (data: z.infer<typeof ContactFormSchema>) => {
    try {
        const validated = ContactFormSchema.safeParse(data)
        if (!validated.success) {
            return {message: "Invalid input"}
        }

        const {firstName, lastName, email, phoneNumber, where, when, budget, how, areThereAnyQuestions} = validated.data
const response  =         await sendEmailInstance({
            params:{
                firstName,
                lastName,
                email,
                phoneNumber,
                where,
                when,
                budget,
                how,
                extra: areThereAnyQuestions
            },
            emailTemplate: staffEmailTemplate.contact,
            to: "travelmate@travelinyourpocket.com",
        })

        if (response && response.response.statusCode && response.response.statusCode > 200 && response.response.statusCode < 300) {
            return {success: true}
        } else {
            return {message: "Failed to send email"}
        }
    } catch (error) {
        console.error(error)
        return {message: "Failed to send email"}
    }
}
