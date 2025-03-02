<script lang="ts">
    import { handleLogin } from "./login"; // Import login logic
    import TwoFAModal from "$lib/components/TwoFA/+page.svelte"; // Import 2FA Modal component
    import { fly } from "svelte/transition";
    import "../../styles/login.css"; // Import styles
    import { goto } from "$app/navigation";

    let email: string = "";
    let password: string = "";
    let errorMessage: string = "";
    let showModal: boolean = false; // Track modal visibility
    let is2FARequired: boolean = false; // Track whether 2FA is required

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
            errorMessage = "";
            const response = await handleLogin(email, password);

            if (!response.ok) {
                errorMessage =
                    response.message || "Login failed. Please try again.";
                return;
            }

            // If login is successful
            localStorage.setItem("token", response.token || "");
            alert("Login successful!");
            goto("/CourseHome");

            // if (response.requires2FA) {
            //   is2FARequired = true; // Flag for showing the 2FA modal
            //   showModal = true; // Show the 2FA modal
            // }
        } catch (error) {
            errorMessage = "An error occurred. Please try again later.";
            console.error(error);
        }
    };

    // Handle closing the 2FA modal
    const closeModal = () => {
        showModal = false;
    };

    // Handle the verification of the 2FA code
    const verifyCode = (event: CustomEvent) => {
        const { code, trustDevice } = event.detail; // Extract data from the event
        console.log("2FA Code:", code);
        console.log("Trust Device:", trustDevice);
        closeModal(); // Close the modal after verification
    };
</script>

<div class="container">
    <div class="left-container"></div>
    <div class="middle-divider"></div>
    <div class="right-container">
        <h2 class="title">Login</h2>
        <!-- <div class="subtitle" in:fly={{ x: 300, duration: 500 }}> -->
        <!--   Please enter your email and password. -->
        <!-- </div> -->
        <form on:submit|preventDefault={onSubmit}>
            <div class="input-container" in:fly={{ x: 300, duration: 500 }}>
                <div>
                    <label for="email">Enter email</label>
                    <input
                        type="email"
                        id="email"
                        bind:value={email}
                        placeholder={"name@example.com"}
                    />
                </div>
                <div>
                    <label for="password">Enter password</label>
                    <input
                        type="password"
                        id="password"
                        bind:value={password}
                        placeholder={"enter your password"}
                    />
                </div>
            </div>
            {#if errorMessage}
                <p class="error-message">{errorMessage}</p>
            {/if}
            <button
                type="submit"
                class="button"
                in:fly={{ x: 300, duration: 500 }}>Log In</button
            >
        </form>
        <div class="footer">
            <div>
                Don't have an account? <a href="/register">Register</a>
            </div>
        </div>
    </div>
</div>

<!-- 2FA Modal -->
<!-- {#if showModal} -->
<!--   <TwoFAModal on:close={closeModal} on:verify={verifyCode} /> -->
<!-- {/if} -->
