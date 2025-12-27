/**
 * Backend endpoint for handling team invitations via Resend
 * This should be implemented in your backend server
 * 
 * Example implementation for an Express.js server:
 */

// const express = require('express');
// const { Resend } = require('resend');
// const router = express.Router();
// 
// const resend = new Resend(process.env.RESEND_API_KEY);
// 
// router.post('/team/invite', async (req, res) => {
//   try {
//     const { email, role, firstName = '', lastName = '' } = req.body;
//     
//     // Validate required fields
//     if (!email) {
//       return res.status(400).json({ error: 'Email is required' });
//     }
//     
//     const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || 'there';
//     
//     // Send invitation email using Resend
//     const { data, error } = await resend.emails.send({
//       from: 'onboarding@yourdomain.com', // Replace with your verified domain
//       to: email,
//       subject: 'Invitation to Join Our Copy Trading Platform',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//           <div style="text-align: center; margin-bottom: 30px;">
//             <h2 style="color: #2d6b2d; margin: 0; font-size: 24px;">Welcome to Our Copy Trading Platform!</h2>
//             <p style="color: #6b7280; margin: 10px 0 0 0;">Join our community of traders and investors</p>
//           </div>
//           
//           <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin: 20px 0;">
//             <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">Hello ${fullName},</p>
//             <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151;">You have been invited to join our copy trading platform as a <strong style="color: #2d6b2d;">${role}</strong>.</p>
//             <p style="margin: 0 0 24px 0; font-size: 16px; color: #374151;">Click the button below to create your account and get started:</p>
//             
//             <div style="text-align: center; margin: 30px 0;">
//               <a href="https://yourdomain.com/signup?email=${encodeURIComponent(email)}&role=${role}" 
//                  style="background-color: #2d6b2d; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
//                 Accept Invitation & Create Account
//               </a>
//             </div>
//           </div>
//           
//           <div style="margin: 24px 0;">
//             <h3 style="color: #1f2937; margin: 0 0 12px 0; font-size: 18px;">What You'll Get:</h3>
//             <ul style="color: #4b5563; padding-left: 20px; margin: 0;">
//               <li style="margin-bottom: 8px;">Access to our advanced copy trading tools</li>
//               <li style="margin-bottom: 8px;">Real-time market data and analytics</li>
//               <li style="margin-bottom: 8px;">Secure and reliable trading environment</li>
//               <li style="margin-bottom: 8px;">24/7 customer support</li>
//             </ul>
//           </div>
//           
//           <p style="margin: 24px 0; font-size: 16px; color: #374151;">If you have any questions, feel free to reach out to our support team at support@yourdomain.com</p>
//           
//           <p style="margin: 24px 0 0 0; font-size: 16px; color: #374151;">Best regards,<br style="margin-bottom: 8px;"><strong>The Copy Trading Platform Team</strong></p>
//           
//           <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
//           
//           <div style="font-size: 12px; color: #6b7280; text-align: center;">
//             <p style="margin: 0 0 8px 0;">This email was sent to ${email} as part of an invitation to join our platform.</p>
//             <p style="margin: 0;">© 2025 Copy Trading Platform. All rights reserved.</p>
//           </div>
//         </div>
//       `,
//     });
// 
//     if (error) {
//       console.error('Resend error:', error);
//       return res.status(500).json({ error: error.message || 'Failed to send invitation email' });
//     }
// 
//     res.status(200).json({ success: true, data });
//   } catch (error) {
//     console.error('Team invite error:', error);
//     res.status(500).json({ error: error.message || 'Internal server error' });
//   }
// });
// 
// module.exports = router;

/**
 * Instructions for implementing the backend endpoint:
 * 
 * 1. Add the backend endpoint code (commented above) to your backend server
 * 2. Make sure to install the required packages in your backend:
 *    npm install resend
 * 3. Ensure your backend has the RESEND_API_KEY environment variable set
 * 4. Update the 'from' email address to use your verified domain
 * 5. Update the signup link to point to your actual signup page
 * 6. Mount the router at the appropriate path in your backend server
 * 
 * The frontend will call this endpoint via the API client, and the backend
 * will handle sending the email through Resend securely.
 */