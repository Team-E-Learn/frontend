<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { verify2FACode } from '$lib/components/TwoFA/TwoFAModal'; // Import 2FA verification logic from 2fa.ts
  import { goto } from '$app/navigation';

  const dispatch = createEventDispatcher();
  
  let code = '';
  let trustDevice = false;
  let errorMessage: string = '';

  function close() {
    dispatch('close');
  }

  function verify() {
    const result = verify2FACode(code, trustDevice); // Call the verify2FACode function

    if (result.verified) {
      console.log('Verification successful');
      goto('/CourseHome'); // Redirect within the SvelteKit app
    } else {
      errorMessage = result.message || 'Verification failed. Please try again.';
    }
  }
</script>

<div class="modal">
  <div class="modal-content">
    <!-- Header with title -->
    <div class="modal-header">
      <h2>2-step verification</h2>
    </div>

    <!-- Divider Line -->
    <hr class="divider" />

    <div class="modal-body">
      <p>Please enter the verification code from your authenticator app.</p>

      <input type="text" bind:value={code} class="input" placeholder="Enter Code" />

      <div class="checkbox">
        <label>
          <input type="checkbox" bind:checked={trustDevice} />
          Trust this device for 30 days
        </label>
      </div>

      {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}

      <button class="button" on:click={verify}>Verify</button>
      <button class="button-secondary" on:click={close}>Cancel</button>
    </div>

    <div class="footer">
      <p>Need help? <a href="https://github.com/SolomonGM">Contact Support</a></p> <!-- W self promo dont forget to change this tho -->
    </div>
  </div>
</div>

<style>
  @import '../../../styles/login/modal.css';
</style>