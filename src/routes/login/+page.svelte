<script lang="ts">
  import { handleLogin } from './login'; // Import login logic
  import TwoFAModal from '$lib/components/TwoFA/+page.svelte'; // Import 2FA Modal component
  import '../../styles/login.css'; // Import styles

  let email: string = '';
  let password: string = '';
  let errorMessage: string = '';
  let showModal: boolean = false;  // Track modal visibility
  let is2FARequired: boolean = false;  // Track whether 2FA is required

  // Handle password input and enforce a 64-character limit
  const handlePasswordInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.value.length > 64) {
      target.value = target.value.slice(0, 64);
    }
  };

  // Handle form submission for login
  const onSubmit = async () => {
    try {
      errorMessage = '';
      const response = await handleLogin(email, password);

      if (!response.ok) {
        errorMessage = response.message || 'Login failed. Please try again.';
        return;
      }

      // If login is successful
      localStorage.setItem('token', response.token || '');
      alert('Login successful!');

      if (response.requires2FA) {
        is2FARequired = true;  // Flag for showing the 2FA modal
        showModal = true; // Show the 2FA modal
      }

    } catch (error) {
      errorMessage = 'An error occurred. Please try again later.';
      console.error(error);
    }
  };

  // Handle closing the 2FA modal
  const closeModal = () => {
    showModal = false;
  };

  // Handle the verification of the 2FA code
  const verifyCode = (event: CustomEvent) => {
    const { code, trustDevice } = event.detail;  // Extract data from the event
    console.log('2FA Code:', code);
    console.log('Trust Device:', trustDevice);
    closeModal();  // Close the modal after verification
  };
</script>

<!-- Login Form -->
<div class="login-container">
  <h2>Login</h2>
  <form on:submit|preventDefault={onSubmit}>
    <input type="email" bind:value={email} placeholder="Email"/>
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      on:input={handlePasswordInput}
    />
    {#if errorMessage}
      <p class="error-message">{errorMessage}</p>
    {/if}
    <button type="submit">Login</button>
  </form>
</div>

<!-- 2FA Modal -->
{#if showModal}
  <TwoFAModal on:close={closeModal} on:verify={verifyCode} />
{/if}
