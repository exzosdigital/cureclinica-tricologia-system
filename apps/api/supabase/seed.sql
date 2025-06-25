-- Insert demo admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'admin@cureclinica.com.br',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Administrador Sistema"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Insert demo doctor user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '22222222-2222-2222-2222-222222222222',
  'authenticated',
  'authenticated',
  'dr.silva@cureclinica.com.br',
  crypt('doctor123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Dr. João Silva"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Update users table with roles
UPDATE public.users SET role = 'admin' WHERE id = '11111111-1111-1111-1111-111111111111';
UPDATE public.users SET role = 'doctor' WHERE id = '22222222-2222-2222-2222-222222222222';

-- Insert demo patients
INSERT INTO public.patients (id, first_name, last_name, email, phone, date_of_birth, gender, created_by) VALUES
('33333333-3333-3333-3333-333333333333', 'Maria', 'Silva', 'maria.silva@email.com', '(11) 99999-1111', '1985-03-15', 'female', '11111111-1111-1111-1111-111111111111'),
('44444444-4444-4444-4444-444444444444', 'João', 'Santos', 'joao.santos@email.com', '(11) 99999-2222', '1978-07-22', 'male', '11111111-1111-1111-1111-111111111111'),
('55555555-5555-5555-5555-555555555555', 'Ana', 'Costa', 'ana.costa@email.com', '(11) 99999-3333', '1992-11-08', 'female', '11111111-1111-1111-1111-111111111111');

-- Insert demo products
INSERT INTO public.products (name, brand, category, description, selling_price, stock_quantity) VALUES
('Shampoo Anticaspa', 'Vichy', 'shampoo', 'Shampoo específico para tratamento de caspa e dermatite seborreica', 89.90, 50),
('Minoxidil 5%', 'Kirkland', 'treatment', 'Solução tópica para tratamento de alopecia androgenética', 65.00, 30),
('Finasterida 1mg', 'Propecia', 'supplement', 'Medicamento oral para alopecia androgenética masculina', 180.00, 25),
('Loção Capilar Nutritiva', 'La Roche Posay', 'treatment', 'Loção fortificante para cabelos frágeis', 120.00, 40);

-- Insert demo consultations
INSERT INTO public.consultations (patient_id, doctor_id, scheduled_at, status, reason) VALUES
('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', NOW() + INTERVAL '1 day', 'scheduled', 'Consulta inicial - queda capilar'),
('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', NOW() + INTERVAL '2 days', 'scheduled', 'Acompanhamento tratamento'),
('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', NOW() + INTERVAL '3 days', 'scheduled', 'Análise tricológica completa');