<script lang="ts">
    import TwoFAModal from "$lib/components/TwoFA/+page.svelte"; // Import 2FA Modal component
    import { fly } from "svelte/transition";
    import "../../styles/login/login.css";
    import { goto } from "$app/navigation";
    import authService from "../../services/authService";
    import { validateLogin } from "./login";

    let email: string = "";
    let password: string = "";
    let errorMessage: string = "";
    let show2faModal: boolean = false; // Track modal visibility
    let limitedJWT: string = "";
    let securityCode: string = "";

    // Handle password input and enforce a 64-character limit
    const handlePasswordInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.value.length > 64) {
            target.value = target.value.slice(0, 64);
        }
    };

    // Handle form submission for login
    const onSubmit = async () => {
        const { ok, message } = validateLogin(email, password);
        if (!ok) {
            errorMessage = message!;
            return;
        }

        try {
            const response = await authService.login(email, password);
            limitedJWT = response.limited_jwt;
        } catch (error) {
            errorMessage = (error as Error).message;
            return;
        }

        errorMessage = "";
        show2faModal = true;
    };

    // Handle closing the 2FA modal
    const close2faModal = () => {
        show2faModal = false;
    };

    // Handle the verification of the 2FA code
    const verifyCode = async (): Promise<void> => {
        try {
            const response = await authService.verify2fa(
                limitedJWT,
                securityCode,
            );
            localStorage.setItem("token", response.full_access_jwt);
            localStorage.setItem("userID", response.user_id);
            localStorage.setItem("accountType", response.account_type);
            alert("Login successful!");
            if (response.account_type === "teacher") {
                goto("/courses/creation");
            } else {
                goto("/courses/view");
            }
        } catch (error) {
            errorMessage = "invalid code";
        }
    };
</script>
<div class="container">
    <div class="left-container"></div>
    <div class="middle-divider"></div>
    <div class="right-container">
        <h2 class="title">Login</h2>
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

{#if show2faModal}
    <div class="overlay" on:click={close2faModal}></div>
    <div class="code-input-popup">
        <button class="close-button" on:click={close2faModal}>&times;</button>
        <div class="input-container">
            <label for="securityCode">Enter Security Code</label>
            <input
                type="text"
                id="securityCode"
                bind:value={securityCode}
                placeholder="Enter your security code"
            />
        </div>
        {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
        {/if}
        <button class="button" on:click={verifyCode}>Verify</button>
    </div>
{/if}
