<script lang="ts">
  import {
    validateEmail,
    handleContinue,
    validateUsername,
    validatePassword,
    register,
  } from "./register";
  import "../../styles/register.css";
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";

  let email: string = "";
  let isValidEmail: boolean = true;
  let showEmailSection: boolean = true;
  let showUsernameSection: boolean = false;
  let showPasswordSection: boolean = false;
  let show2FASection: boolean = false;
  let showQRCode: boolean = false;
  let showCodeInput: boolean = false;
  let errorMessage: string = "";
  let username: string = ""; // Track the username input value
  let isValidUsername: boolean = true;
  let password: string = ""; // Track the password input value
  let confirmPassword: string = ""; // Track the confirm password input value
  let securityCode: string = ""; // Track the security code input value
  let showPassword: boolean = false; // Track the visibility of the password input
  let showConfirmPassword: boolean = false; // Track the visibility of the confirm password input

  const dispatch = createEventDispatcher();

  // Handle form submission for registration
  const onContinueClick = (): void => {
    const { isValid, message } = handleContinue(email);
    isValidEmail = isValid;
    errorMessage = message;

    if (!isValidEmail) {
      email = "";
      const emailInput = document.getElementById("email") as HTMLInputElement;
      emailInput.classList.add("invalid");
      emailInput.focus();
    } else {
      const emailInput = document.getElementById("email") as HTMLInputElement;
      emailInput.classList.remove("invalid");
      showEmailSection = false; // Transition to the username section
      showUsernameSection = true;
    }
  };

  // Handle form submission for username
  const onUsernameContinueClick = async (): Promise<void> => {
    const { isValid, message } = await validateUsername(username);
    isValidUsername = isValid;
    errorMessage = message;

    if (!isValidUsername) {
      username = ""; // Clear the username input
      const usernameInput = document.getElementById(
        "username",
      ) as HTMLInputElement;
      usernameInput.classList.add("invalid");
      usernameInput.focus();
    } else {
      const usernameInput = document.getElementById(
        "username",
      ) as HTMLInputElement;
      usernameInput.classList.remove("invalid");
      showUsernameSection = false; // Transition to the password section
      showPasswordSection = true;
    }
  };

  // Handle form submission for password
  const onPasswordContinueClick = async () => {
    const { isValid, message } = validatePassword(password, confirmPassword);
    if (!isValid) {
      errorMessage = message;
      if (message === "Passwords do not match.") {
        confirmPassword = ""; // Clear the confirm password input
        const confirmPasswordInput = document.getElementById(
          "confirmPassword",
        ) as HTMLInputElement;
        confirmPasswordInput.classList.add("invalid");
        confirmPasswordInput.focus();
      } else {
        password = "";
        confirmPassword = "";
        const passwordInput = document.getElementById(
          "password",
        ) as HTMLInputElement;
        passwordInput.classList.add("invalid");
        passwordInput.focus();
      }
    } else {
      // skip 2fa for now

      // showPasswordSection = false; // Transition to the 2FA section
      // show2FASection = true;

      const response = await register(email, username, password);
      if (!response.ok) {
        errorMessage = response.message || "Signup failed. Please try again.";
        return;
      }

      localStorage.setItem("token", response.token || "");
      alert("Registration successful!");
      goto("/CourseHome");
    }
  };

  // Handle back button click
  const onBackClick = (): void => {
    if (showUsernameSection) {
      showUsernameSection = false;
      showEmailSection = true; // Go back to the email section
    } else if (showPasswordSection) {
      showPasswordSection = false;
      showUsernameSection = true; // Go back to the username section
    } else if (show2FASection) {
      show2FASection = false;
      showPasswordSection = true; // Go back to the password section
    }
  };

  // Handle QR code button click
  const onShowQRCodeClick = (): void => {
    showQRCode = true;
  };

  // Handle close QR code pop-up
  const closeQRCode = (): void => {
    showQRCode = false;
  };

  // Handle show code input button click
  const onShowCodeInputClick = (): void => {
    showCodeInput = true;
  };

  // Handle close code input pop-up
  const closeCodeInput = (): void => {
    showCodeInput = false;
  };

  // Handle code verification
  const verifyCode = (): void => {
    // Add verification logic here
    console.log("Security code entered:", securityCode);
    closeCodeInput();
  };

  // Truncate username if it exceeds 8 characters
  const getTruncatedUsername = (username: string): string => {
    return username.length > 8 ? username.substring(0, 8) + "..." : username;
  };

  // Toggle password visibility
  const togglePasswordVisibility = (): void => {
    showPassword = !showPassword;
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = (): void => {
    showConfirmPassword = !showConfirmPassword;
  };
</script>

<div class="container">
  <div class="left-container"></div>
  <div class="middle-divider"></div>
  <div class="right-container">
    {#if showEmailSection}
      <div class="title">Welcome, User!</div>
      <div class="subtitle" in:fly={{ x: 300, duration: 500 }}>
        Please enter your email to get started.
      </div>
      <div class="input-container" in:fly={{ x: 300, duration: 500 }}>
        <label for="email">Enter email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          class:invalid={!isValidEmail}
          placeholder={isValidEmail ? "e.g jane@hello.com" : errorMessage}
        />
      </div>
      <button
        class="button"
        on:click={onContinueClick}
        in:fly={{ x: 300, duration: 500 }}>Continue</button
      >
    {:else if showUsernameSection}
      <button
        class="back-button"
        on:click={onBackClick}
        in:fly={{ x: 300, duration: 500 }}>🡰 Back</button
      >
      <div class="title">Welcome, User!</div>
      <div class="subtitle" in:fly={{ x: 300, duration: 500 }}>
        Please enter a valid username to continue.
      </div>
      <div class="input-container" in:fly={{ x: 300, duration: 500 }}>
        <label for="username">Enter username</label>
        <input
          type="text"
          id="username"
          bind:value={username}
          class:invalid={!isValidUsername}
          placeholder={isValidUsername ? "Enter your username" : errorMessage}
        />
      </div>
      <button
        class="button"
        on:click={onUsernameContinueClick}
        in:fly={{ x: 300, duration: 500 }}>Continue</button
      >
    {:else if showPasswordSection}
      <button
        class="back-button"
        on:click={onBackClick}
        in:fly={{ x: 300, duration: 500 }}>🡰 Back</button
      >
      <div class="title">Welcome, {getTruncatedUsername(username)}!</div>
      <div class="subtitle" in:fly={{ x: 300, duration: 500 }}>
        Please enter a valid password to continue.
      </div>
      <div
        class="input-container password-container"
        in:fly={{ x: 300, duration: 500 }}
      >
        <label for="password">Enter password</label>
        <div class="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            bind:value={password}
            class:invalid={errorMessage &&
              errorMessage !== "Passwords do not match."}
            placeholder={errorMessage &&
            errorMessage !== "Passwords do not match."
              ? errorMessage
              : "Enter your password"}
          />
          <button
            type="button"
            class="toggle-visibility"
            on:click={togglePasswordVisibility}
          >
            {#if showPassword}
              <svg
                class="eye-icon open"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            {:else}
              <svg
                class="eye-icon closed"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5.52 0-10-4.48-10-10 0-2.39.84-4.58 2.24-6.32"
                ></path>
                <path d="M1 1l22 22"></path>
              </svg>
            {/if}
          </button>
        </div>
      </div>
      <div
        class="input-container password-container"
        in:fly={{ x: 300, duration: 500 }}
      >
        <label for="confirmPassword">Confirm password</label>
        <div class="password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            bind:value={confirmPassword}
            class:invalid={errorMessage === "Passwords do not match."}
            placeholder={errorMessage === "Passwords do not match."
              ? errorMessage
              : "Confirm your password"}
          />
          <button
            type="button"
            class="toggle-visibility"
            on:click={toggleConfirmPasswordVisibility}
          >
            {#if showConfirmPassword}
              <svg
                class="eye-icon open"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            {:else}
              <svg
                class="eye-icon closed"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5.52 0-10-4.48-10-10 0-2.39.84-4.58 2.24-6.32"
                ></path>
                <path d="M1 1l22 22"></path>
              </svg>
            {/if}
          </button>
        </div>
      </div>
      <button
        class="button"
        on:click={onPasswordContinueClick}
        in:fly={{ x: 300, duration: 500 }}>Continue</button
      >
    {:else if show2FASection}
      <button
        class="back-button"
        on:click={onBackClick}
        in:fly={{ x: 300, duration: 500 }}>🡰 Back</button
      >
      <div id="auth-title" class="title">Enable Authenticator App</div>
      <div
        id="auth-subtitle"
        class="subtitle"
        in:fly={{ x: 300, duration: 500 }}
      >
        Make your account safer in 3 Easy Steps:
      </div>
      <div class="box" in:fly={{ x: 300, duration: 500 }}>
        <div class="content">
          <div class="step-title">Download an Authenticator App</div>
          <div class="step-description">
            Download and install an authenticator app for your phone or tablet.
          </div>
          <div class="step-title">Scan the QR Code</div>
          <div class="step-description">
            Open the authenticator app, tap the '+' and scan the QR code below
            using your phone or tablet.
          </div>
          <button class="button" on:click={onShowQRCodeClick}
            >Show QR Code</button
          >
          <div class="step-title">Sign in with your Security Code</div>
          <div class="step-description">
            Enter the security code below and click verify to continue.
          </div>
          <button class="button" on:click={onShowCodeInputClick}
            >Enter Security Code</button
          >
        </div>
      </div>
    {/if}
    <div class="footer">
      Already have an account? <a href="/login">Sign in</a>
    </div>
  </div>
</div>

<!-- {#if showQRCode} -->
<!--   <div class="overlay" on:click={closeQRCode}></div> -->
<!--   <div class="qr-code-popup"> -->
<!--     <button class="close-button" on:click={closeQRCode}>&times;</button> -->
<!--     <div class="qr-code">[QR Code Image]</div> -->
<!--   </div> -->
<!-- {/if} -->
<!---->
<!-- {#if showCodeInput} -->
<!--   <div class="overlay" on:click={closeCodeInput}></div> -->
<!--   <div class="code-input-popup"> -->
<!--     <button class="close-button" on:click={closeCodeInput}>&times;</button> -->
<!--     <div class="input-container"> -->
<!--       <label for="securityCode">Enter Security Code</label> -->
<!--       <input -->
<!--         type="text" -->
<!--         id="securityCode" -->
<!--         bind:value={securityCode} -->
<!--         placeholder="Enter your security code" -->
<!--       /> -->
<!--     </div> -->
<!--     <button class="button" on:click={verifyCode}>Verify</button> -->
<!--   </div> -->
<!-- {/if} -->
