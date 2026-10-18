// Task 1: Fetch and validate a user with async/await.
async function fetchUser(id) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch user ${id}: HTTP ${response.status}`);
    }

    const user = await response.json();

    if (
        !user ||
        user.id !== id ||
        typeof user.name !== "string" ||
        user.name.trim() === "" ||
        typeof user.email !== "string" ||
        user.email.trim() === ""
    ) {
        throw new Error(`Invalid user data for ID ${id}`);
    }

    return user;
}

async function task1() {
    try {
        const user = await fetchUser(1);
        console.log("Valid user:", user);
    } catch (error) {
        console.error("Task 1 error:", error.message);
    }
}

// Task 2: Promise.all succeeds only if both operations succeed.
async function fetchBothUsers(firstId, secondId) {
    const users = await Promise.all([
        fetchUser(firstId),
        fetchUser(secondId)
    ]);

    return users;
}

async function task2() {
    try {
        const users = await fetchBothUsers(1, 2);
        console.log("Both users are valid:", users);
    } catch (error) {
        console.error("Combined promise rejected:", error.message);
    }

    // Invalid ID demonstrates rejection of the combined promise.
    try {
        const users = await fetchBothUsers(1, 9999);
        console.log("Both users are valid:", users);
    } catch (error) {
        console.error("Combined promise rejected:", error.message);
    }
}

async function main() {
    await task1();
    await task2();
}

main().catch(error => console.error(error.message));
