
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { System } from '@/lib/garden/types';
import { createSystem, updateSystem } from '@/lib/garden/api';
import { toast } from 'sonner';
import { CircleDashed } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface SystemFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  initialData?: System;
}

const SystemFormDialog: React.FC<SystemFormDialogProps> = ({
  isOpen,
  onOpenChange,
  onSuccess,
  initialData
}) => {
  const isEditing = !!initialData;
  
  // Form state
  const [formData, setFormData] = useState<Partial<System>>(
    initialData || {
      name: '',
      description: '',
      category: 'personal',
      importanceLevel: 3,
      visibility: 'public',
      isSelf: false,
      color: '#3b82f6'
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle toggle changes
  const handleToggleChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing && initialData) {
        // Update existing system
        await updateSystem(initialData.id, formData);
        toast.success('System updated successfully');
      } else {
        // Create new system
        await createSystem(formData as Omit<System, 'id' | 'createdAt' | 'updatedAt'>);
        toast.success('System created successfully');
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving system:', error);
      toast.error(isEditing ? 'Failed to update system' : 'Failed to create system');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit System' : 'Create New System'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update this system\'s details and relationships'
              : 'Add a new system to organize your mental models'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* System Name */}
          <div className="space-y-2">
            <Label htmlFor="name">System Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Self, Career, Health, Education"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* System Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe this system..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="cognitive">Cognitive</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="spiritual">Spiritual</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                name="color"
                type="color"
                value={formData.color}
                onChange={handleChange}
                className="w-16 h-9 p-1"
              />
              <Input
                value={formData.color}
                onChange={handleChange}
                name="color"
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>

          {/* Importance Level */}
          <div className="space-y-2">
            <Label htmlFor="importanceLevel">Importance Level (1-5)</Label>
            <Select
              value={formData.importanceLevel?.toString()}
              onValueChange={(value) => handleSelectChange('importanceLevel', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select importance level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Low</SelectItem>
                <SelectItem value="2">2 - Medium-Low</SelectItem>
                <SelectItem value="3">3 - Medium</SelectItem>
                <SelectItem value="4">4 - Medium-High</SelectItem>
                <SelectItem value="5">5 - High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Is Self System */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isSelf" className="block mb-1">Self System</Label>
              <p className="text-sm text-muted-foreground">Mark this as your primary self system</p>
            </div>
            <Switch
              id="isSelf"
              checked={formData.isSelf}
              onCheckedChange={(checked) => handleToggleChange('isSelf', checked)}
            />
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select
              value={formData.visibility}
              onValueChange={(value) => handleSelectChange('visibility', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="gap-1"
            >
              {isSubmitting && <CircleDashed className="h-4 w-4 animate-spin" />}
              {isEditing ? 'Update System' : 'Create System'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SystemFormDialog;
