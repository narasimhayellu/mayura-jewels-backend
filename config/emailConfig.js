const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Mayura Jewels <onboarding@resend.dev>",
            to,
            subject,
            html,
        });

        if (error) {
            console.log("Email error:", error);
            return false;
        }

        console.log("Email sent:", data);
        return true;
    } catch (err) {
        console.log("Send error:", err);
        return false;
    }
};

module.exports = sendEmail;