"use client";
import { updateUserMoneySpent } from '@/actions/update-money-spent';
import React, { useState } from 'react';

const UpdateMoneySpentButton = ({ userId, currentMoneySpent }: { userId: string, currentMoneySpent: number }) => {
  const [newMoneySpent, setNewMoneySpent] = useState<number>(currentMoneySpent);

  const handleUpdateMoneySpent = async () => {
    if (isNaN(newMoneySpent) || newMoneySpent < 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      const result = await updateUserMoneySpent({ userId, moneySpent: newMoneySpent });
      if (result.success) {
        alert('Money spent updated successfully');
      } else {
        alert(result.message || 'Failed to update money spent');
      }
    } catch (error) {
      console.error('Failed to update money spent:', error);
      alert('Failed to update money spent');
    }
  };

  return (
    <div>
      <input
        type="number"
        value={newMoneySpent}
        onChange={(e) => setNewMoneySpent(Number(e.target.value))}
        className="border p-2 rounded"
      />
      <button
        type="button"
        onClick={handleUpdateMoneySpent}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UpdateMoneySpentButton;