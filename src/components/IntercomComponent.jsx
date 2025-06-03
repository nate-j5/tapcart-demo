import { useState, useEffect } from 'react';
import { useIntercom } from 'react-use-intercom';

function IntercomComponent() {
  const [openCount, setOpenCount] = useState(0);
  const { boot, shutdown } = useIntercom();

  useEffect(() => {
    boot({
      api_base: "https://api-iam.intercom.io",
      custom_launcher_selector: '#my-custom-launcher',
      vertical_padding: 20,
    });
    
    // Reset count on page load
    localStorage.removeItem('intercomOpenCount');
    setOpenCount(0);
  }, [boot, shutdown]);

  useEffect(() => {
    let isModalOpen = false;

    // Function to track when Intercom opens
    const trackIntercomOpen = () => {
      if (!isModalOpen) {
        setOpenCount(prev => prev + 1);
        isModalOpen = true;
      }
    };

    // Track when Intercom closes
    const trackIntercomClose = () => {
      isModalOpen = false;
    };

    // Add event listeners for Intercom
    window.Intercom('onShow', trackIntercomOpen);
    window.Intercom('onHide', trackIntercomClose);

    return () => {
      window.Intercom('onHide', () => {});
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100%',
      alignItems: 'center'
    }}>
      <div style={{
        width: '45%',
        maxWidth: '500px',
        padding: '40px 20px 40px 40px',
        marginLeft: '350px',
        textAlign: 'left',
        color: '#333333',
        marginRight: 'auto'
      }}>
        <div style={{
          marginBottom: '30px'
        }}>
          <img 
            src="/logo/logo.png" 
            alt="Tapcart Logo" 
            style={{
              height: '120px',
              width: 'auto',
              marginBottom: '20px',
              display: 'block'
            }}
          />
          
          <h1 style={{
            fontSize: '42px',
            marginBottom: '10px',
            color: '#1a1a1a',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>Tapcart Messages</h1>
        </div>

        <div style={{
          marginBottom: '20px'
        }}>
          <h4 style={{
            fontSize: '16px',
            marginBottom: '8px',
            color: '#1a1a1a',
            fontWeight: '600'
          }}>Message Center Activity</h4>
          <p style={{
            fontSize: '14px',
            color: '#6c757d',
            marginBottom: '12px',
            lineHeight: '1.4'
          }}>Tracking message center interactions in current session</p>
          <div style={{
            fontSize: '16px',
            color: '#4a4a4a',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            marginTop: '8px'
          }}>
            <span style={{
              fontWeight: '600'
            }}>Interactions: {openCount}</span>
            <button 
              onClick={() => setOpenCount(0)}
              style={{
                padding: '6px 12px',
                fontSize: '14px',
                backgroundColor: '#e2e6ea',
                color: '#495057',
                border: '1px solid #ced4da',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                ':hover': {
                  backgroundColor: '#d3d9df',
                  borderColor: '#c1c9d0'
                }
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntercomComponent; 