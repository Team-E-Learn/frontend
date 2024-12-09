<script lang="ts">
  import { handleLogin } from './login';
  import '../../styles/login.css';

  let email: string = '';
  let password: string = '';
  let errorMessage: string = '';

  // Handle password input and enforce 64-character limit
  const handlePasswordInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.value.length > 64) {
      target.value = target.value.slice(0, 64);
    }
  };

  const onSubmit = async () => {
    try {
      const response = await handleLogin(email, password);
      if (!response.ok) {
        const { error } = await response.json();
        errorMessage = error || 'Login failed. Please try again.';
      } else {
        const data = await response.json();
        console.log('Login successful:', data);

        // Save token to localStorage or handle user session
        localStorage.setItem('token', data.token);
        alert('Login successful!');
      }
    } catch (error) {
      errorMessage = 'An error occurred. Please try again later.';
    }
  };
</script>

<div class="login-container">
  <h2>Login</h2>
  <form on:submit|preventDefault={onSubmit}>
    <input type="email" bind:value={email} placeholder="Email" required />
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      required
      on:input={handlePasswordInput} 
    />
    {#if errorMessage}
      <p class="error-message">{errorMessage}</p>
    {/if}
    <button type="submit">Login</button>
  </form>
</div>
