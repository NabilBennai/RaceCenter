package com.racecenter.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailVerificationMailer {

	private final JavaMailSender mailSender;
	private final String frontendBaseUrl;

	public EmailVerificationMailer(JavaMailSender mailSender,
			@Value("${app.frontend.base-url:http://localhost:4200}") String frontendBaseUrl) {
		this.mailSender = mailSender;
		this.frontendBaseUrl = frontendBaseUrl;
	}

	public void sendVerificationEmail(String toEmail, String token) {
		var verifyLink = frontendBaseUrl + "/verify-email?token=" + token;
		var message = new SimpleMailMessage();
		message.setTo(toEmail);
		message.setSubject("RaceCenter - Verifie ton e-mail");
		message.setText(
				"Bienvenue sur RaceCenter.\n\nClique sur ce lien pour verifier ton adresse e-mail:\n" + verifyLink);
		mailSender.send(message);
	}

	public void sendResetPasswordEmail(String toEmail, String token) {
		var resetLink = frontendBaseUrl + "/reset-password?token=" + token;
		var message = new SimpleMailMessage();
		message.setTo(toEmail);
		message.setSubject("RaceCenter - Reinitialisation du mot de passe");
		message.setText(
				"Tu as demande une reinitialisation de mot de passe.\n\nClique sur ce lien pour definir un nouveau mot de passe:\n"
						+ resetLink);
		mailSender.send(message);
	}
}
