<script lang="ts">
    import { handleLogin } from '../../services/login';
    import '../../styles/login.css';
  
    let email: string = "";
    let password: string = "";
  
    // Function to handle login form submission
    const onLogin = (event: Event) => {
      // Prevent default form submission behavior
      event.preventDefault();
  
      // Call login handler with email and password
      const result = handleLogin(email, password);
  
      // Display appropriate messages based on result
      if (!result.success) {
        alert(result.message);
      } else {
        console.log(result.message); // "Login successful!" (or custom message)
        // Optional: Add logic to redirect or update UI after successful login
      }
    };
  </script>
  
  <div class="login-container">
    <h2>Login</h2>
    <form on:submit|preventDefault={onLogin}>
      <input type="email" bind:value={email} placeholder="Email" required />
      <input type="password" bind:value={password} placeholder="Password" maxlength="64" required/>
      <button type="submit">Login</button>
    </form>
  </div>
  