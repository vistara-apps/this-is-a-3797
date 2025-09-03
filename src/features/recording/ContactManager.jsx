import React, { useState } from 'react';
import { Plus, X, User, Phone, Mail, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FormGroup } from '../../components/ui/FormGroup';
import { AlertBanner } from '../../components/ui/AlertBanner';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../hooks/useApp';

/**
 * ContactManager component for managing emergency contacts
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.showForm - Whether to show the contact form
 * @param {Function} props.onToggleForm - Callback when form visibility is toggled
 */
const ContactManager = ({ showForm, onToggleForm }) => {
  const { isAuthenticated } = useAuth();
  const { settings, addEmergencyContact, removeEmergencyContact } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  
  /**
   * Handle form input change
   * @param {Object} event - Input change event
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  /**
   * Validate form data
   * @returns {boolean} - Whether the form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.phone = 'Phone or email is required';
      newErrors.email = 'Phone or email is required';
    }
    
    if (formData.email.trim() && !formData.email.includes('@')) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Handle form submission
   * @param {Object} event - Form submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Add contact
    addEmergencyContact({
      id: `contact-${Date.now()}`,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
    });
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
    });
    
    // Hide form
    onToggleForm();
  };
  
  /**
   * Handle contact removal
   * @param {string} contactId - Contact ID
   */
  const handleRemoveContact = (contactId) => {
    removeEmergencyContact(contactId);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-neutral-900/60 mb-4">
          You need to be logged in to manage emergency contacts.
        </p>
        <Button asChild>
          <a href="/register">Sign Up</a>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {settings.emergencyContacts && settings.emergencyContacts.length > 0 ? (
        <div className="space-y-2">
          {settings.emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between bg-neutral-100 p-3 rounded-md"
            >
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-neutral-900/60" />
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-neutral-900/60">
                    {contact.phone && contact.email
                      ? `${contact.phone} • ${contact.email}`
                      : contact.phone || contact.email}
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveContact(contact.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-neutral-900/60 mb-2">
            No emergency contacts added yet.
          </p>
          <p className="text-sm text-neutral-900/60 mb-4">
            Add contacts to receive alerts during emergencies.
          </p>
        </div>
      )}
      
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4 mt-4">
          <FormGroup
            label="Name"
            htmlFor="name"
            error={errors.name}
          >
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter contact name"
            />
          </FormGroup>
          
          <FormGroup
            label="Phone Number"
            htmlFor="phone"
            error={errors.phone}
          >
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </FormGroup>
          
          <FormGroup
            label="Email"
            htmlFor="email"
            error={errors.email}
          >
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
            />
          </FormGroup>
          
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">
              Add Contact
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onToggleForm}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button
          variant="outline"
          onClick={onToggleForm}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Emergency Contact
        </Button>
      )}
    </div>
  );
};

export { ContactManager };
