import { useState } from 'react';
import { useToast } from '../context/ToastContext';

const initialMembers = [
  { name: 'Ali', color: 'bg-green' },
  { name: 'Sara', color: 'bg-orange' },
  { name: 'Omar', color: 'bg-primary' },
  { name: 'Nour', color: 'bg-teal' }
];

export const useGroup = () => {
  const [groupCount, setGroupCount] = useState(1);
  const [groupMembersList, setGroupMembersList] = useState([]);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const { showToast } = useToast();

  const simulateInvite = () => {
    if (groupCount > 4) return;
    
    const newMember = initialMembers[groupCount - 1];
    setGroupMembersList(prev => [...prev, newMember]);
    
    const newCount = groupCount + 1;
    setGroupCount(newCount);
    
    if (newCount > 4) {
      showToast("Group completed! You earned the max 10% cashback tier.");
    }
  };

  const progressPercent = Math.min((groupCount / 5) * 100, 100);
  const cashbackVal = groupCount > 4 ? 10 : 5 + (groupCount - 1) * 1.25;

  return {
    groupCount,
    groupMembersList,
    isGroupModalOpen,
    setIsGroupModalOpen,
    simulateInvite,
    progressPercent,
    cashbackVal
  };
};

