export const createOrder = async (idProduct: number[], token: string) => {
    try {
        console.log(idProduct, token);
        const response = await fetch("http://localhost:3001/orders", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ products: idProduct }),
        });

        const orders = await response.json();
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getAllOrders = async (token: string) => {
  try {
    const res = await fetch("http://localhost:3001/users/orders", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            cache: "no-cache",
            Authorization: token,
        },
    });
    const orders = await res.json();
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}