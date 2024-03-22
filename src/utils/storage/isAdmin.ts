export const isAdmin = (token: string | null) => {
    if (!token) {
        return false;
    }

    try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));


        if (tokenData.roles == "admin") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Помилка при обробці токена:', error);
        return false;
    }
};