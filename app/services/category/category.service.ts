"use server"

export const getAllCategories = async () => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
            cache: "no-store",
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}