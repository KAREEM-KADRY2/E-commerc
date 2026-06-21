import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Plus, ChevronRight, PackageOpen, ShieldCheck, X } from 'lucide-react';
import AddProductsModal from '../components/ui/AddProductsModal';
const StartGroupBuy = () => {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleCreateGroup = () => {
    if (selectedProducts.length === 0) {
      return;
    }
    const finalGroupName = groupName.trim() || 'My Group Buy';
    // Navigate to group details with state
    navigate('/group-details', {
      state: {
        groupName: finalGroupName,
        products: selectedProducts
      }
    });
  };
  const removeProduct = id => {
    setSelectedProducts(prev => prev.filter(p => p.id !== id));
  };
  const isFormValid = selectedProducts.length > 0;
  return <div style={{
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Inter, sans-serif',
    paddingBottom: '40px'
  }}>
      <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px'
    }}>
        
        {/* Header */}
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '40px'
      }}>
          <button onClick={() => navigate(-1)} style={{
          position: 'absolute',
          left: 0,
          width: '40px',
          height: '40px',
          background: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <ArrowLeft size={20} color="#4a5568" />
          </button>
          <div style={{
          textAlign: 'center'
        }}>
            <h1 style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#003b46',
            margin: '0 0 4px 0'
          }}>{t("Start a Group Buy")}</h1>
            <p style={{
            fontSize: '14px',
            color: '#6c757d',
            margin: 0
          }}>{t("Create your group and start saving together")}</p>
          </div>
        </div>

        {/* Group Name Card */}
        <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
      }}>
          <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '700',
          color: '#868e96',
          marginBottom: '12px',
          letterSpacing: '0.5px'
        }}>{t("GROUP NAME")}</label>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '8px',
          padding: '4px'
        }}>
            <div style={{
            width: '48px',
            height: '48px',
            background: '#e6f9f5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            margin: '2px'
          }}>
              <Users size={20} color="#008b8b" />
            </div>
            <input type="text" value={groupName} onChange={e => setGroupName(e.target.value)} placeholder={t("Enter Group Name (e.g., Gaming Setup)")} style={{
            flex: 1,
            border: 'none',
            padding: '0 16px',
            fontSize: '15px',
            outline: 'none',
            color: '#212529'
          }} />
          </div>
          <p style={{
          fontSize: '13px',
          color: '#868e96',
          margin: 0
        }}>{t("Choose a name that describes your group")}</p>
        </div>

        {/* Add Products Button */}
        <div onClick={() => setIsModalOpen(true)} style={{
        border: '2px dashed #bcebe1',
        background: '#f8fdfc',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative'
      }}>
          <div style={{
          width: '56px',
          height: '56px',
          background: '#e6f9f5',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
            <Plus size={24} color="#008b8b" />
          </div>
          <div>
            <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#008b8b',
            margin: '0 0 4px 0'
          }}>{t("Add Products")}</h3>
            <p style={{
            fontSize: '14px',
            color: '#6c757d',
            margin: 0
          }}>{t("Add the products you want to buy together")}</p>
          </div>
          <ChevronRight size={20} color="#6c757d" style={{
          position: 'absolute',
          right: '24px'
        }} />
        </div>

        {/* Selected Products Section */}
        <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        paddingBottom: selectedProducts.length > 0 ? '24px' : '40px',
        marginBottom: '32px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
      }}>
          <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '700',
          color: '#868e96',
          marginBottom: selectedProducts.length > 0 ? '16px' : '32px',
          letterSpacing: '0.5px'
        }}>{t("SELECTED PRODUCTS")}</label>
          
          {selectedProducts.length === 0 ? <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0'
        }}>
              <div style={{
            marginBottom: '20px',
            opacity: 0.7
          }}>
                <PackageOpen size={80} color="#bcebe1" strokeWidth={1} />
              </div>
              <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#343a40',
            margin: '0 0 8px 0'
          }}>{t("No products added yet")}</h3>
              <p style={{
            fontSize: '14px',
            color: '#868e96',
            margin: 0
          }}>{t("Tap \"Add Products\" to start adding items to your group")}</p>
            </div> : <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
              {selectedProducts.map(product => {
            return <div key={product.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              gap: '16px'
            }}>
                  <img src={product.image} alt={product.name} style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                objectFit: 'cover'
              }} />
                  <div style={{
                flex: 1
              }}>
                    <h4 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1a1d20',
                  margin: '0 0 4px 0'
                }}>{product.name}</h4>
                    <span style={{
                  color: '#008b8b',
                  fontWeight: '700',
                  fontSize: '13px'
                }}>{product.price}{t("AED")}</span>
                  </div>
                  <button onClick={() => removeProduct(product.id)} style={{
                background: 'none',
                border: 'none',
                color: '#adb5bd',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%'
              }}>
                    <X size={18} />
                  </button>
                </div>;
          })}
            </div>}
        </div>

        {/* Footer Actions */}
        <button onClick={handleCreateGroup} disabled={!isFormValid} style={{
        width: '100%',
        background: isFormValid ? '#f5a623' : '#e9ecef',
        color: isFormValid ? 'white' : '#adb5bd',
        border: 'none',
        padding: '20px',
        borderRadius: '16px',
        fontSize: '18px',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        cursor: isFormValid ? 'pointer' : 'not-allowed',
        marginBottom: '20px',
        boxShadow: isFormValid ? '0 4px 12px rgba(245, 166, 35, 0.3)' : 'none',
        transition: 'all 0.3s'
      }}>{t("Create Group & Get Invite Link")}<ChevronRight size={20} />
        </button>

        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        color: '#868e96',
        fontSize: '13px'
      }}>
          <ShieldCheck size={16} color="#008b8b" />{t("You can invite friends and start saving together")}</div>

      </div>

      <AddProductsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddProducts={products => setSelectedProducts(prev => [...prev, ...products.filter(p => !prev.some(existing => existing.id === p.id))])} />
    </div>;
};
export default StartGroupBuy;
