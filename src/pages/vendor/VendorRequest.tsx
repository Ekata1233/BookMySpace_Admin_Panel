import React, { useEffect, useState } from 'react';

const API_URL = 'https://book-my-space-eta.vercel.app/api/officeSpaces';

interface OfficeSpace {
  _id: string;
  officeName: string;
  category: string;
  city: string;
  state: string;
  pincode: string;
  description: string;
  rate: string;
  isAdminApprove: boolean;
}

const VendorRequest: React.FC = () => {
  const [officeSpaces, setOfficeSpaces] = useState<OfficeSpace[]>([]);

  console.log('office·spaces·:·', officeSpaces);

  const fetchOfficeSpaces = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (Array.isArray(json.data)) {
        setOfficeSpaces(json.data);
      } else {
        console.error('Invalid response format:', json);
      }
    } catch (err) {
      console.error('Error fetching office spaces:', err);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAdminApprove: true }),
      });
      fetchOfficeSpaces();
    } catch (err) {
      console.error('Error approving office space:', err);
    }
  };

  useEffect(() => {
    fetchOfficeSpaces();
  }, []);

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h2 style={{ color: '#6BB7BE', marginBottom: '20px' }}>Vendor Requests</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#6BB7BE', color: '#fff' }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Office Name</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>City</th>
            <th style={thStyle}>State</th>
            <th style={thStyle}>Pincode</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Rate</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {officeSpaces.length > 0 ? (
            officeSpaces.map((office, index) => (
              <tr key={office._id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{office.officeName}</td>
                <td style={tdStyle}>{office.category}</td>
                <td style={tdStyle}>{office.city}</td>
                <td style={tdStyle}>{office.state}</td>
                <td style={tdStyle}>{office.pincode}</td>
                <td style={tdStyle}>{office.description}</td>
                <td style={tdStyle}>{office.rate}</td>
                <td style={tdStyle}>
                  {office.isAdminApprove ? (
                    <button style={{ ...btnStyle, backgroundColor: 'green' }}>Approved</button>
                  ) : (
                    <button
                      onClick={() => handleApprove(office._id)}
                      style={{ ...btnStyle, backgroundColor: '#6BB7BE' }}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center', padding: '20px' }}>
                No vendor requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
  verticalAlign: 'top',
};

const btnStyle: React.CSSProperties = {
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
};

export default VendorRequest;
