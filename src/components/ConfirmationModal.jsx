"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal } from "@heroui/react";

export default function ConfirmationModal({
  children,
  request,
  onConfirm,
}) {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  return (
    <Modal>
      {children}

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md">

            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Confirm Donation
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="space-y-5">

              <div>
                <Label>Donor Name</Label>
                <Input
                  value={user?.name || ""}
                  readOnly
                />
              </div>

              <div>
                <Label>Donor Email</Label>
                <Input
                  value={user?.email || ""}
                  readOnly
                />
              </div>

              <div className="rounded-lg bg-red-50 p-4 text-sm">
                <p>
                  <strong>Recipient:</strong> {request.recipientName}
                </p>

                <p>
                  <strong>Blood Group:</strong> {request.bloodGroup}
                </p>

                <p>
                  <strong>Location:</strong> {request.district},{" "}
                  {request.upazila}
                </p>
              </div>

            </Modal.Body>

            <Modal.Footer>

              <Button
                variant="light"
                slot="close"
              >
                Cancel
              </Button>

              <Button
                slot="close"
                onClick={onConfirm}
                className="bg-red-600 text-white"
              >
                Confirm Donation
              </Button>

            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}