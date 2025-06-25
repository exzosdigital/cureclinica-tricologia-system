-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT NOT NULL, -- shampoo, conditioner, treatment, supplement, device
  subcategory TEXT, -- specific type within category
  
  description TEXT,
  ingredients TEXT,
  usage_instructions TEXT,
  contraindications TEXT,
  
  -- Inventory
  sku TEXT UNIQUE,
  barcode TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  min_stock_level INTEGER DEFAULT 10,
  
  -- Pricing
  cost_price DECIMAL(10,2),
  selling_price DECIMAL(10,2),
  
  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,
  requires_prescription BOOLEAN NOT NULL DEFAULT false,
  
  -- Metadata
  supplier TEXT,
  expiry_date DATE,
  batch_number TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  consultation_id UUID REFERENCES public.consultations(id),
  treatment_id UUID REFERENCES public.treatments(id),
  
  -- Payment details
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL, -- cash, credit_card, debit_card, pix, bank_transfer
  payment_status payment_status NOT NULL DEFAULT 'pending',
  
  -- Dates
  due_date DATE,
  paid_date DATE,
  
  -- Additional info
  description TEXT,
  transaction_id TEXT,
  receipt_number TEXT,
  
  -- Installments
  installment_number INTEGER DEFAULT 1,
  total_installments INTEGER DEFAULT 1,
  
  notes TEXT,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  treatment_id UUID REFERENCES public.treatments(id),
  product_id UUID NOT NULL REFERENCES public.products(id),
  prescribed_by UUID NOT NULL REFERENCES public.users(id),
  
  quantity INTEGER NOT NULL,
  dosage TEXT,
  frequency TEXT,
  duration TEXT,
  instructions TEXT,
  
  prescribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_sku ON public.products(sku);
CREATE INDEX idx_products_stock ON public.products(stock_quantity);

CREATE INDEX idx_payments_patient ON public.payments(patient_id);
CREATE INDEX idx_payments_status ON public.payments(payment_status);
CREATE INDEX idx_payments_due_date ON public.payments(due_date);

CREATE INDEX idx_prescriptions_patient ON public.prescriptions(patient_id);
CREATE INDEX idx_prescriptions_product ON public.prescriptions(product_id);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

-- Add updated_at triggers
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
CREATE POLICY "Users can view products" ON public.products
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can manage products" ON public.products
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'doctor') AND is_active = true
    )
  );

CREATE POLICY "Users can view payments" ON public.payments
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can manage payments" ON public.payments
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Users can view prescriptions" ON public.prescriptions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Doctors can manage prescriptions" ON public.prescriptions
  FOR ALL TO authenticated
  USING (
    prescribed_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'doctor')
    )
  );