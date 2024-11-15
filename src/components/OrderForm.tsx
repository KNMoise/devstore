import { useState } from "react";
import Modal from "./ui/Modal";
import Spinner from "./ui/Spinner";
import Button from "./ui/Button";
import { useSession } from "next-auth/react";

const OrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const handleSubmitOrder = async () => {
    if (!session?.user?.id) {
      alert("You must be logged in to place an order.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });

      if (response.ok) {
        setOrderSuccess(true);
        setIsModalOpen(true);
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button onClick={handleSubmitOrder} className="mb-4" disabled={isSubmitting}>
        Place Order
      </Button>

      {isSubmitting && <Spinner />}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {orderSuccess ? <h2>Your order has been successfully placed!</h2> : <h2>Failed to place order</h2>}
      </Modal>
    </div>
  );
};

export default OrderForm;
