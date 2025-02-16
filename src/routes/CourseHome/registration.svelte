<script lang="ts">
    import { validateEmail, validateUsername, validate2FA, validatePassword } from './registration.ts';

    let email = '';
    let confirmationCode = '';
    let username = '';
    let twoFaCode = '';
    let password = '';

    let emailError = false;
    let confirmationError = false;
    let usernameError = false;
    let twoFaError = false;
    let passwordError = false;

    let step = 1; // Track current step

    function nextStep() {
        switch (step) {
            case 1:
                if (validateEmail(email)) {
                    emailError = false;
                    step = 2;
                } else {
                    emailError = true;
                }
                break;
            case 2:
                if (confirmationCode === '123456') {  // Example confirmation code
                    confirmationError = false;
                    step = 3;
                } else {
                    confirmationError = true;
                }
                break;
            case 3:
                if (validateUsername(username)) {
                    usernameError = false;
                    step = 4;
                } else {
                    usernameError = true;
                }
                break;
            case 4:
                if (validate2FA(twoFaCode)) {
                    twoFaError = false;
                    step = 5;
                } else {
                    twoFaError = true;
                }
                break;
            case 5:
                if (validatePassword(password)) {
                    passwordError = false;
                    alert('Account Created!');
                    // Optionally, navigate or perform additional actions here
                } else {
                    passwordError = true;
                }
                break;
        }
    }
</script>

<style src="./registration.css"></style>

<div class="container">
    <h2>REGISTRATION</h2>

    <!-- Step 1: Email Entry -->
    {#if step === 1}
        <div class="form-group">
            <label for="email">Enter your email</label>
            <input type="email" id="email" bind:value={email} placeholder="Email" required>
            {#if emailError}<div class="error">Please enter a valid email.</div>{/if}
        </div>
        <button class="btn" on:click={nextStep}>Next</button>
    {/if}

    <!-- Step 2: Confirmation Code -->
    {#if step === 2}
        <div class="form-group">
            <label for="confirmation-code">Enter confirmation code</label>
            <input type="text" id="confirmation-code" bind:value={confirmationCode} placeholder="Code" required>
            {#if confirmationError}<div class="error">Invalid code. Please try again.</div>{/if}
        </div>
        <button class="btn" on:click={nextStep}>Next</button>
    {/if}

    <!-- Step 3: Username -->
    {#if step === 3}
        <div class="form-group">
            <label for="username">Enter your username</label>
            <input type="text" id="username" bind:value={username} placeholder="Username" required>
            {#if usernameError}<div class="error">Please enter a valid username (at least 3 characters).</div>{/if}
        </div>
        <button class="btn" on:click={nextStep}>Next</button>
    {/if}

    <!-- Step 4: 2FA -->
    {#if step === 4}
        <div class="form-group">
            <label for="2fa">Enter 2FA code</label>
            <input type="text" id="2fa" bind:value={twoFaCode} placeholder="2FA Code" required>
            {#if twoFaError}<div class="error">Invalid 2FA code. Please try again.</div>{/if}
        </div>
        <button class="btn" on:click={nextStep}>Next</button>
    {/if}

    <!-- Step 5: Password Entry -->
    {#if step === 5}
        <div class="form-group">
            <label for="password">Enter your password</label>
            <input type="password" id="password" bind:value={password} placeholder="Password" required>
            {#if passwordError}<div class="error">Password is required (at least 6 characters).</div>{/if}
        </div>
        <button class="btn" on:click={nextStep}>Create Account</button>
    {/if}
</div>
