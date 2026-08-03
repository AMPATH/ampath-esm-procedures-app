import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExtensionSlot, launchWorkspace, useConfig, type Order } from '@openmrs/esm-framework';
import { type Config } from '../config-schema';
import { type BillStatus } from '../types';

interface GenerateBillRequestActionMenuProps {
  order: Order;
  billStatus: BillStatus;
  isLoading: boolean;
  mutated: () => void;
}

const GenerateBillRequestAction: React.FC<GenerateBillRequestActionMenuProps> = ({
  order,
  billStatus = 'BLANK',
  isLoading,
  mutated,
}) => {
  const { t } = useTranslation();
  const { proceduresServiceTypedUuid } = useConfig<Config>();

  const launchBillWorkspace = () => {
    launchWorkspace('create-order-bill-form-workspace', {
      workspaceTitle: t('createOrderBill', 'Create order bill form'),
      order,
      quantity: 1,
      serviceTypeUuid: proceduresServiceTypedUuid,
      servicePointName: "PROCEDURES",
      mutated,
    });
  };

  return <ExtensionSlot state={{ order, billStatus, isLoading, launchBillWorkspace }} name="generate-order-bill-button-slot" />
};

export default GenerateBillRequestAction;
