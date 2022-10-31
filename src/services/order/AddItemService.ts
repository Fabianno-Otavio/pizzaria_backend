import prismaClient from "../../prisma";

interface ItemRequest{
    order_id: string,
    product_id: string,
    amount: number
}

class AddItemService {
    async execute({ order_id, product_id, amount }: ItemRequest){

        const existItem = await prismaClient.item.findFirst({
            where: { 
                order_id: order_id, product_id: product_id 
            }
        });

        if(existItem){
            const newAmount = amount + existItem.amount;

            const item = await prismaClient.item.update({
                where: {
                    id: existItem.id
                },
                data: {
                    amount: newAmount
                }
            });
            return item;
        }

        const item = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount: amount
            }
        })

        return item;
    }
}

export { AddItemService };