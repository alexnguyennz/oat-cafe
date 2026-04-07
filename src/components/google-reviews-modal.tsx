import { useEffect, useState } from "react";

import { Button, Modal, Spinner } from "@heroui/react";

export const GoogleReviewsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    // Set the newsletter modal as dismissed when the modal is closed
    if (!nextOpen) {
      localStorage.setItem("newsletter-modal", "true");
    }
    setIsOpen(nextOpen);
  };

  // Show modal after 5 seconds if not already open, and the user hasn't dismissed or submitted
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!localStorage.getItem("newsletter-modal")) setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <Modal>
      <Button onPress={() => setIsOpen(true)} variant="secondary">
        Open Modal
      </Button>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        variant="transparent"
      >
        <Modal.Container size="lg" placement="bottom">
          <Modal.Dialog className="max-w-4xl">
            <Modal.CloseTrigger />
            {/*<Modal.Header>
              <Modal.Heading>
                Had a great experience at Oat Cafe? Don't forget to leave a
                review!
              </Modal.Heading>
            </Modal.Header>*/}

            {/*<Spinner size="xl" className="m-auto" />*/}
            <Modal.Body>
              <p className="text-center text-xl text-black">
                Had a great experience at Oat Café? Don't forget to leave a
                review!
              </p>
              <iframe
                title="Google Reviews"
                width="100%"
                height="500"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://featurable.com/widgets/v2/5a9cb335-592b-440d-9e8d-be7723a4b03d"
              ></iframe>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
