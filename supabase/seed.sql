-- ============================================================
-- SEED: Chapters for all 36 states + FCT
-- ============================================================

INSERT INTO public.chapters (state, slug, status, tagline, about, hq_address, contact_email, contact_phone, established, stat_projects, stat_communities, stat_events, stat_lgas) VALUES
  ('Abia', 'abia', 'active', 'Empowering rural youth in God''s Own State', 'The Abia State Chapter is committed to agricultural innovation and youth skills development across the state''s rural communities. We focus on cassava value chains, small-scale manufacturing, and digital literacy programs.', 'RYM Secretariat, Umuahia, Abia State', 'abia@rym.ng', '+234 801 000 0001', '2024', 8, 45, 12, 10),
  ('Adamawa', 'adamawa', 'active', 'Building resilience in the Northeast', 'The Adamawa Chapter focuses on post-conflict youth rehabilitation, agricultural rebuilding, and community peace initiatives across the state.', 'RYM Office, Yola, Adamawa State', 'adamawa@rym.ng', '+234 801 000 0002', '2024', 5, 30, 8, 12),
  ('Akwa Ibom', 'akwa-ibom', 'active', 'Harnessing the oil-rich coast for rural youth', 'Our Akwa Ibom Chapter drives aquaculture, palm oil innovation, and coastal community development for rural youth across the state.', 'RYM Hub, Uyo, Akwa Ibom State', 'akwaibom@rym.ng', '+234 801 000 0003', '2024', 10, 55, 15, 14),
  ('Anambra', 'anambra', 'active', 'Youth-led enterprise in the Light of the Nation', 'The Anambra Chapter promotes youth entrepreneurship, agribusiness, and community development across rural Anambra.', 'RYM Office, Awka, Anambra State', 'anambra@rym.ng', '+234 801 000 0004', '2024', 12, 40, 10, 11),
  ('Bauchi', 'bauchi', 'active', 'Transforming the Pearl of Tourism', 'Bauchi Chapter drives youth agricultural programs, livestock development, and civic engagement across the state.', 'RYM Secretariat, Bauchi, Bauchi State', 'bauchi@rym.ng', '+234 801 000 0005', '2024', 6, 35, 9, 13),
  ('Bayelsa', 'bayelsa', 'forming', 'Empowering the Glory of All Lands', 'The Bayelsa Chapter is being established to address the unique challenges of riverine communities and oil-producing areas.', 'RYM Office, Yenagoa, Bayelsa State', 'bayelsa@rym.ng', '+234 801 000 0006', '2025', 2, 15, 4, 5),
  ('Benue', 'benue', 'active', 'Food basket of the nation, powered by youth', 'Benue Chapter leverages the state''s agricultural heritage to build youth-led farming cooperatives and value-chain enterprises.', 'RYM Hub, Makurdi, Benue State', 'benue@rym.ng', '+234 801 000 0007', '2024', 14, 60, 18, 15),
  ('Borno', 'borno', 'active', 'Rebuilding hope in the Home of Peace', 'The Borno Chapter works on youth rehabilitation, agricultural revival, and peace-building in communities affected by insurgency.', 'RYM Office, Maiduguri, Borno State', 'borno@rym.ng', '+234 801 000 0008', '2024', 7, 25, 10, 10),
  ('Cross River', 'cross-river', 'active', 'The People''s Paradise for rural innovation', 'Cross River Chapter promotes ecotourism, cocoa farming, and youth civic participation across the state.', 'RYM Hub, Calabar, Cross River State', 'crossriver@rym.ng', '+234 801 000 0009', '2024', 9, 42, 11, 12),
  ('Delta', 'delta', 'active', 'The Big Heart for rural development', 'Delta Chapter focuses on aquaculture, oil palm innovation, and youth empowerment in the Niger Delta region.', 'RYM Office, Asaba, Delta State', 'delta@rym.ng', '+234 801 000 0010', '2024', 11, 50, 14, 15),
  ('Ebonyi', 'ebonyi', 'active', 'Salt of the Nation, strength of youth', 'Ebonyi Chapter drives rice farming innovation, solid minerals development, and youth skills acquisition.', 'RYM Secretariat, Abakaliki, Ebonyi State', 'ebonyi@rym.ng', '+234 801 000 0011', '2024', 7, 38, 9, 10),
  ('Edo', 'edo', 'active', 'Heartbeat of the Nation''s youth movement', 'The Edo Chapter promotes rubber and oil palm agriculture, youth artisan development, and civic engagement.', 'RYM Hub, Benin City, Edo State', 'edo@rym.ng', '+234 801 000 0012', '2024', 10, 45, 12, 12),
  ('Ekiti', 'ekiti', 'active', 'Fountain of Knowledge, spring of rural change', 'Ekiti Chapter focuses on cocoa farming, education-driven development, and youth cooperative societies.', 'RYM Office, Ado-Ekiti, Ekiti State', 'ekiti@rym.ng', '+234 801 000 0013', '2024', 8, 35, 10, 11),
  ('Enugu', 'enugu', 'active', 'Coal City driving green futures', 'The Enugu Chapter champions sustainable agriculture, youth tech hubs, and community infrastructure development.', 'RYM Hub, Enugu, Enugu State', 'enugu@rym.ng', '+234 801 000 0014', '2024', 13, 52, 16, 13),
  ('Gombe', 'gombe', 'active', 'Jewel of the Savannah empowering youth', 'Gombe Chapter promotes livestock rearing, grain production, and youth civic leadership.', 'RYM Office, Gombe, Gombe State', 'gombe@rym.ng', '+234 801 000 0015', '2024', 5, 28, 7, 8),
  ('Imo', 'imo', 'active', 'Eastern Heartland of youth enterprise', 'Imo Chapter drives palm oil innovation, youth SMEs, and agricultural mechanisation.', 'RYM Secretariat, Owerri, Imo State', 'imo@rym.ng', '+234 801 000 0016', '2024', 9, 40, 11, 14),
  ('Jigawa', 'jigawa', 'active', 'The New World of agricultural youth', 'Jigawa Chapter focuses on irrigation farming, groundnut processing, and youth cooperative development.', 'RYM Office, Dutse, Jigawa State', 'jigawa@rym.ng', '+234 801 000 0017', '2024', 6, 32, 8, 15),
  ('Kaduna', 'kaduna', 'active', 'Centre of Learning, hub of youth action', 'Kaduna Chapter promotes ginger and maize value chains, inter-community peace initiatives, and youth leadership.', 'RYM Hub, Kaduna, Kaduna State', 'kaduna@rym.ng', '+234 801 000 0018', '2024', 15, 65, 20, 18),
  ('Kano', 'kano', 'active', 'Centre of Commerce, centre of youth power', 'The Kano Chapter is one of our largest, driving groundnut and leather value chains, youth artisan guilds, and mass civic mobilisation.', 'RYM Hub, Kano, Kano State', 'kano@rym.ng', '+234 801 000 0019', '2024', 18, 80, 25, 22),
  ('Katsina', 'katsina', 'active', 'Home of Hospitality, home of opportunity', 'Katsina Chapter focuses on cotton farming, livestock development, and youth skills training.', 'RYM Office, Katsina, Katsina State', 'katsina@rym.ng', '+234 801 000 0020', '2024', 7, 38, 9, 16),
  ('Kebbi', 'kebbi', 'forming', 'Land of Equity rising through youth', 'The Kebbi Chapter is being formed to harness rice and fishing potential for rural youth development.', 'RYM Office, Birnin Kebbi, Kebbi State', 'kebbi@rym.ng', '+234 801 000 0021', '2025', 3, 18, 5, 7),
  ('Kogi', 'kogi', 'active', 'Confluence of opportunity for rural youth', 'Kogi Chapter promotes cashew farming, solid minerals youth cooperatives, and civic participation.', 'RYM Hub, Lokoja, Kogi State', 'kogi@rym.ng', '+234 801 000 0022', '2024', 8, 40, 10, 13),
  ('Kwara', 'kwara', 'active', 'State of Harmony, united for rural change', 'Kwara Chapter drives sugar cane processing, shea butter innovation, and youth agricultural schemes.', 'RYM Office, Ilorin, Kwara State', 'kwara@rym.ng', '+234 801 000 0023', '2024', 9, 42, 11, 12),
  ('Lagos', 'lagos', 'active', 'Bridging urban-rural divides in the Centre of Excellence', 'The Lagos Chapter uniquely focuses on peri-urban agriculture, youth tech-agri startups, and connecting rural migrants with opportunities.', 'RYM Hub, Ikeja, Lagos State', 'lagos@rym.ng', '+234 801 000 0024', '2024', 20, 35, 30, 10),
  ('Nasarawa', 'nasarawa', 'active', 'Home of Solid Minerals, solid youth futures', 'Nasarawa Chapter promotes small-scale mining cooperatives, yam farming, and youth civic engagement.', 'RYM Office, Lafia, Nasarawa State', 'nasarawa@rym.ng', '+234 801 000 0025', '2024', 6, 30, 8, 10),
  ('Niger', 'niger', 'active', 'Power State powering youth development', 'Niger Chapter focuses on rice farming, shea nut processing, and youth environmental conservation programs.', 'RYM Hub, Minna, Niger State', 'niger@rym.ng', '+234 801 000 0026', '2024', 10, 50, 13, 16),
  ('Ogun', 'ogun', 'active', 'Gateway State opening doors for rural youth', 'Ogun Chapter promotes cassava processing, poultry farming, and youth industrial skills development.', 'RYM Office, Abeokuta, Ogun State', 'ogun@rym.ng', '+234 801 000 0027', '2024', 12, 48, 14, 14),
  ('Ondo', 'ondo', 'active', 'Sunshine State brightening rural futures', 'Ondo Chapter drives cocoa and bitumen innovations, fisheries development, and youth cooperative movements.', 'RYM Hub, Akure, Ondo State', 'ondo@rym.ng', '+234 801 000 0028', '2024', 9, 40, 11, 13),
  ('Osun', 'osun', 'active', 'State of the Living Spring, nurturing youth', 'Osun Chapter focuses on cocoa revitalisation, osun camwood innovations, and youth cultural enterprise.', 'RYM Office, Osogbo, Osun State', 'osun@rym.ng', '+234 801 000 0029', '2024', 8, 38, 10, 15),
  ('Oyo', 'oyo', 'active', 'Pace Setter in youth-led rural transformation', 'Oyo Chapter promotes cassava and maize farming, youth agro-processing hubs, and community governance.', 'RYM Hub, Ibadan, Oyo State', 'oyo@rym.ng', '+234 801 000 0030', '2024', 14, 55, 17, 17),
  ('Plateau', 'plateau', 'active', 'Home of Peace and Tourism, home of youth hope', 'Plateau Chapter drives Irish potato farming, tin mining cooperatives, and inter-ethnic youth peace programs.', 'RYM Office, Jos, Plateau State', 'plateau@rym.ng', '+234 801 000 0031', '2024', 10, 45, 13, 12),
  ('Rivers', 'rivers', 'active', 'Treasure Base of the Nation, treasure of youth', 'Rivers Chapter focuses on aquaculture, oil-community youth programs, and environmental advocacy.', 'RYM Hub, Port Harcourt, Rivers State', 'rivers@rym.ng', '+234 801 000 0032', '2024', 13, 50, 16, 14),
  ('Sokoto', 'sokoto', 'active', 'Seat of the Caliphate, seat of youth ambition', 'Sokoto Chapter promotes leather tanning, onion farming, and youth Islamic scholarship-meets-civic-action programs.', 'RYM Office, Sokoto, Sokoto State', 'sokoto@rym.ng', '+234 801 000 0033', '2024', 6, 30, 8, 14),
  ('Taraba', 'taraba', 'forming', 'Nature''s Gift to the Nation', 'The Taraba Chapter is being established to promote tea farming, fisheries, and youth outdoor recreation enterprises.', 'RYM Office, Jalingo, Taraba State', 'taraba@rym.ng', '+234 801 000 0034', '2025', 3, 15, 4, 6),
  ('Yobe', 'yobe', 'active', 'Pride of the Sahel, pride of youth resilience', 'Yobe Chapter works on post-insurgency youth recovery, livestock programs, and grain storage cooperatives.', 'RYM Office, Damaturu, Yobe State', 'yobe@rym.ng', '+234 801 000 0035', '2024', 5, 22, 7, 9),
  ('Zamfara', 'zamfara', 'forming', 'Farming is our pride', 'The Zamfara Chapter is being formed to address security challenges facing rural farming youth and promote safe agriculture.', 'RYM Office, Gusau, Zamfara State', 'zamfara@rym.ng', '+234 801 000 0036', '2025', 2, 12, 3, 5),
  ('FCT', 'fct', 'active', 'The nation''s capital, the movement''s heartbeat', 'The FCT Chapter serves as the national coordination hub, driving policy advocacy, national events, and connecting all state chapters.', 'RYM National Secretariat, Abuja, FCT', 'fct@rym.ng', '+234 801 000 0037', '2024', 16, 20, 28, 4);


-- ============================================================
-- SEED: Chapter Executives (3 per chapter — Coordinator, Secretary, Treasurer)
-- ============================================================

-- We'll use a DO block to insert executives for each chapter by state name.
DO $$
DECLARE
  ch RECORD;
BEGIN
  FOR ch IN SELECT id, state FROM public.chapters LOOP
    INSERT INTO public.chapter_executives (chapter_id, name, role, display_order) VALUES
      (ch.id, ch.state || ' Coordinator', 'State Coordinator', 1),
      (ch.id, ch.state || ' Secretary', 'State Secretary', 2),
      (ch.id, ch.state || ' Treasurer', 'State Treasurer', 3);
  END LOOP;
END $$;


-- ============================================================
-- SEED: National Executives
-- ============================================================

INSERT INTO public.national_executives (name, role, bio, display_order) VALUES
  ('National President', 'National President', 'Leading the Rural Youth Movement''s vision for grassroots development across Nigeria''s 36 states and the FCT.', 1),
  ('National Vice President', 'National Vice President', 'Supporting the president and coordinating inter-state chapter activities and national campaigns.', 2),
  ('National Secretary General', 'Secretary General', 'Managing the day-to-day operations of RYM at the national level, coordinating communications and documentation.', 3),
  ('National Treasurer', 'National Treasurer', 'Overseeing the financial health and accountability of the movement at the national level.', 4),
  ('Director of Programs', 'Director of Programs', 'Designing and implementing national programs across agriculture, education, civic engagement, and youth empowerment.', 5),
  ('Director of Communications', 'Director of Communications', 'Managing RYM''s public image, media relations, social media presence, and internal communications.', 6),
  ('Director of Partnerships', 'Director of Partnerships', 'Building strategic relationships with government agencies, NGOs, international organisations, and the private sector.', 7),
  ('National Women''s Leader', 'National Women''s Leader', 'Championing gender inclusion and women''s empowerment within the rural youth movement.', 8),
  ('National Youth Mobiliser', 'National Youth Mobiliser', 'Driving grassroots recruitment, volunteer coordination, and youth engagement campaigns nationwide.', 9);
