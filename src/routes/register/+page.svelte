<script lang="ts">
  import { validateEmail, handleContinue } from './register'; 
  import '../../styles/register.css';
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

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
  let password: string = ""; // Track the password input value
  let confirmPassword: string = ""; // Track the confirm password input value
  let securityCode: string = ""; // Track the security code input value

  const dispatch = createEventDispatcher();

  // Handle form submission for registration
  const onContinueClick = (): void => {
    const { isValid, message } = handleContinue(email); 
    isValidEmail = isValid;
    errorMessage = message;

    if (!isValidEmail) {
      email = "";
      const emailInput = document.getElementById("email") as HTMLInputElement;
      emailInput.classList.add('invalid'); 
      emailInput.focus();
    } else {
      const emailInput = document.getElementById("email") as HTMLInputElement;
      emailInput.classList.remove('invalid'); 
      showEmailSection = false; // Transition to the username section
      showUsernameSection = true;
    }
  };

  // Handle form submission for username
  const onUsernameContinueClick = (): void => {
    // Add your username validation logic here
    console.log("Username submitted:", username);
    showUsernameSection = false; // Transition to the password section
    showPasswordSection = true;
  };

  // Handle form submission for password
  const onPasswordContinueClick = (): void => {
    // Add your password validation logic here
    console.log("Password submitted:", password);
    showPasswordSection = false; // Transition to the 2FA section
    show2FASection = true;
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
    // Add your code verification logic here
    console.log("Security code entered:", securityCode);
    closeCodeInput();
  };
</script>

<div class="container">
  <div class="left-container"></div>
  <div class="middle-divider"></div>
  <div class="right-container">
    {#if showEmailSection}
      <div class="title">Welcome, User!</div>
      <div class="subtitle" in:fly={{ x: 300, duration: 500 }}>Please enter your email to get started.</div>
      <div class="input-container" in:fly={{ x: 300, duration: 500 }}>
        <label for="email">Enter email</label>
        <input type="email" id="email" bind:value={email} class:invalid={!isValidEmail} placeholder={isValidEmail ? "e.g jane@hello.com" : errorMessage}/>
      </div>
      <button class="button" on:click={onContinueClick} in:fly={{ x: 300, duration: 500 }}>Continue</button>
      <div class="footer">
        Already have an account? <a href="/login">Sign in</a>
      </div>
    {:else if showUsernameSection}
      <button class="back-button" on:click={onBackClick} in:fly={{ x: 300, duration: 500 }}>🡰 Back</button>
      <div class="title">Welcome, User!</div>
      <div class="subtitle" in:fly={{ x: 300, duration: 500 }}>Please enter a valid username to continue.</div>
      <div class="input-container" in:fly={{ x: 300, duration: 500 }}>
        <label for="username">Enter username</label>
        <input type="text" id="username" bind:value={username} placeholder="Enter your username"/>
      </div>
      <button class="button" on:click={onUsernameContinueClick} in:fly={{ x: 300, duration: 500 }}>Continue</button>
      <div class="footer">
        Already have an account? <a href="/login">Sign in</a>
      </div>
    {:else if showPasswordSection}
      <button class="back-button" on:click={onBackClick} in:fly={{ x: 300, duration: 500 }}>🡰 Back</button>
      <div class="title">Welcome, User!</div>
      <div class="subtitle" in:fly={{ x: 300, duration: 500 }}>Please enter a valid password to continue.</div>
      <div class="input-container" in:fly={{ x: 300, duration: 500 }}>
        <label for="password">Enter password</label>
        <input type="password" id="password" bind:value={password} placeholder="Enter your password"/>
      </div>
      <div class="input-container" in:fly={{ x: 300, duration: 500 }}>
        <label for="confirmPassword">Confirm password</label>
        <input type="password" id="confirmPassword" bind:value={confirmPassword} placeholder="Confirm your password"/>
      </div>
      <button class="button" on:click={onPasswordContinueClick} in:fly={{ x: 300, duration: 500 }}>Continue</button>
      <div class="footer">
        Already have an account? <a href="/login">Sign in</a>
      </div>
    {:else if show2FASection}
      <button class="back-button" on:click={onBackClick} in:fly={{ x: 300, duration: 500 }}>🡰 Back</button>
      <div id="auth-title" class="title">Enable Authenticator App</div>
      <div id="auth-subtitle" class="subtitle" in:fly={{ x: 300, duration: 500 }}>Make your account safer in 3 Easy Steps:</div>
      <div class="box" in:fly={{ x: 300, duration: 500 }}>
        <div class="content">
          <div class="step-title">Download an Authenticator App</div>
          <div class="step-description">Download an Install an authenticator app for your phone or tablet.</div>
          <div class="step-title">Scan the QR Code</div>
          <div class="step-description">Open the authenticator app, tap the '+' and scan the QR code below using your phone or tablet.</div>
          <button class="button" on:click={onShowQRCodeClick}>Show QR Code</button>
          <div class="step-title">Sign in with your Security Code</div>
          <div class="step-description">Enter the security code below and click verify to contine.</div>
          <button class="button" on:click={onShowCodeInputClick}>Enter Security Code</button>
        </div>
      </div>
    {/if}
  </div>
</div>

{#if showQRCode}
  <div class="overlay" on:click={closeQRCode}></div>
  <div class="qr-code-popup">
    <button class="close-button" on:click={closeQRCode}>&times;</button>
    <div class="qr-code">[QR Code Image]</div>
  </div>
{/if}

{#if showCodeInput}
  <div class="overlay" on:click={closeCodeInput}></div>
  <div class="code-input-popup">
    <button class="close-button" on:click={closeCodeInput}>&times;</button>
    <div class="input-container">
      <label for="securityCode">Enter Security Code</label>
      <input type="text" id="securityCode" bind:value={securityCode} placeholder="Enter your security code"/>
    </div>
    <button class="button" on:click={verifyCode}>Verify</button>
  </div>
{/if}