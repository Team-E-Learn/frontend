<script lang="ts">
  import { validateEmail, handleContinue } from './register'; 
  import '../../styles/register.css'; 

  let email: string = "";
  let isValidEmail: boolean = true; 
  let errorMessage: string = ""; 

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
    }
  };
</script>

<div class="container">
  <div class="left-container"></div>
  <div class="middle-divider"></div>
  <div class="right-container">
    <div class="title">Welcome, User!</div>
    <div class="subtitle">Please enter your email to get started.</div>
    <div class="input-container">
      <label for="email">Enter email</label>
      <input type="email" id="email" bind:value={email} class:invalid={!isValidEmail} placeholder={isValidEmail ? "e.g jane@hello.com" : errorMessage}/>
    </div>
    <button class="button" on:click={onContinueClick}>Continue</button>
    <div class="footer">
      Already have an account? <a href="/login">Sign in</a>
    </div>
  </div>
</div>