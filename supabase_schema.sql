-- =============================================
-- MarketCorp — Supabase Schema
-- Run this in: Supabase → SQL Editor → New Query
-- =============================================

-- Products table
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text    not null,
  category    text    not null,
  description text,
  price       numeric not null,
  sale_price  numeric,
  image_url   text,
  rating      numeric default 4.5,
  stock       int     default 100,
  is_featured boolean default false,
  created_at  timestamptz default now()
);

-- Public read access (no auth required)
alter table public.products enable row level security;
create policy "products are public"
  on public.products for select using (true);

-- =============================================
-- Seed Data — 12 sample products
-- =============================================
insert into public.products (name, category, description, price, sale_price, image_url, rating, stock, is_featured, created_at) values
(
  'AeroMesh Ergonomic Task Chair', 'Seating',
  'Adaptive lumbar support, breathable mesh back, and a 12-year warranty. Built for marathon work sessions.',
  499, null,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDykgrFH-dlfbIGO__zkVoEnAOREKkJGjPQFtxfzWp_swpDVopAqpDvv3qJeZt-X8Gfdl5j6qUW5TRLN0ZzQoKI7PNhK4hN06yocUVDreKslPPpDUXA7bCGh4mP0UQAinMsL96x-GbrZ5oJlXkHBeX6tpMS8mHiRHhVayQsJ82tTZQwmXblouimQiQUDbC2rgxrwc9Z5cMCU1F8FxuL-Qt1zeNXpBOCRraKHWX_t3spLfsKhrapPsVR5JIVSLBRlPJRTrTKqsGMpwfq',
  4.7, 42, true, '2026-01-15'
),
(
  'ProType Wireless Combo', 'Tech',
  'Mechanical low-profile keyboard and precision mouse. Multi-device pairing for up to 3 devices.',
  159, 129,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDLpiC3ji_hIXg20F1Wj9Drz5H4jUELNKyrt9SZQ2cUHA5U1tPlecGqHK3plE8C8eLP2ChXy0n59MDs9qSMdmYtg0BRfMSC8VozCq8gIL4MDQIWEOkgLrGlPBrPc3Zpl7i8FkvNPPtiV_kkbzkw33UhR4-0GvoTt_GCjf_UAslG-MprPUxMai4lhYxuNoCXraLHo7xHvPEOvscr94-jLnSd5A2n8T2AnFxcu_dJyrj_6gQTWgctY7VPqABvGAjIdCuG6og3CSnaSCqe',
  4.5, 120, true, '2026-02-20'
),
(
  'Lumina Focus Task Lamp', 'Lighting',
  'Tunable color temperature from 2700K–6500K, glare-free LED, USB-C pass-through charging.',
  85, null,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAf9fq0i4IrDDl6wohdo0_bggMtgcRrNFXIhKrfGLWKyQ_K4dYgTFdigiWItYE-2AKfnldL8QkjTzpQYEi1V6x4jelkVuBL8nIJOmtW_iU0tvVvh6_b1MCjQ3PcIHspf1TZUCvO_AWmu4kllkt9ZaLTxS_f6qjoz3t-KPPwam8kWAJFUbzlx-34td8cvMrypSY0JgZU8Z97769Sw14L83xPdbiSDKEGvJFjkRAF2Q_vc6rwlU8FvvvaC1riRsB3ZThIAsmCYnkt58vW',
  4.6, 60, true, '2026-03-01'
),
(
  'Executive Leather Portfolio', 'Accessories',
  'Full-grain leather, solid brass hardware, fits 13" laptop and A4 documents.',
  145, null,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCorjTOdySh-lwVWxAomG450uR2OK8tblN1JXJYnpAGV0iXbF_8FIi4VpjJefpnr3eaXLoBluXwAizhiMGSP-CSIG2gxzu8PG6AHybMw5r-24b1M7ClRLxKCbvVVV8vD8YF6YSbGFbpaAY9Zzlfc00Sta8SRu9ORlx5TVPBqWduDXG1GTjzTkp1rHmZ_LSf-RLEkdxQC8uj9VaNrYTaTf2LzqLkW444UsgyhFoe7MCubCvL5re9h_Hh8Zx83S-fijvXe6imrP72HELg',
  4.8, 30, true, '2025-11-10'
),
(
  'Sony WH-1000XM5 Wireless Headphones', 'Audio',
  'Industry-leading noise cancellation. 30-hour battery, multipoint connection, ultra-comfortable lightweight design.',
  398, 348,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAUGC5vIxPlAl9wQL_LyHCrr9AUPBYRwbVWGbpIIp4oBfvWFPSv2iD0X15EG_snpLFOkF8cUQPnvQx949L-ZB3S92Sy4Orn4gJCD54z3Dr7ll2N1NxWSZr3PHfJfs_5iQQtQ59Jxh8kR-sML3_J170W0dcPaMj6n77QtTD49qbZCEJ3S7g5Jn5oZx1lunaBuSmVP2ZPDQTIz300WXXWSYMU8khbEeGI8GffcWszK5aqKN9y9eQeckptx2MLg_N4I0A_4lJNhQyuAYIe',
  4.8, 24, false, '2026-04-02'
),
(
  'Bose QuietComfort Earbuds II', 'Audio',
  'CustomTune sound calibration, world-class noise cancellation in a tiny earbud.',
  279, null,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCZd8-1QzeDKO3_kIe6shPUjZYEBgnjSJeJQAb5K0C2fszyKJAwyYJf3Eag22ftjOtOcAUTxARtEZVvAljX9aqUdzYrDsShHQQ-Qr_YGBe6cdlW_pm01RqCyRqlVUT4OGb_618PcQm_arLc2kN6Qf0dwjrS50d4AkXSWY7-Msf2FDDdHzehIPiP3dUj0YQOAWOEuMLHhge17l7epLcK0ZCzMYZ0LtFmnj6hHlV5St17m98oet2_2TKvmJVm0PyV5cDfruiswTTjfPGy',
  4.6, 55, false, '2025-12-05'
),
(
  'Sennheiser Momentum 4 Wireless', 'Audio',
  '60-hour battery, adaptive noise cancellation, hand-tuned audio by Sennheiser engineers.',
  349.95, 299.95,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCM2oeUbYN5EXpDEzyu6QdLrqgw1yigPXb4ZMX8zxhi6YRaupt7kuRJJGDz9Epf8e_55Y5bf-d0OzjyzQkDQviiIgqhADeEm0OfiTwVT0Zoe8pm5OhSc93i367vGLiPqfm0n8bIE53FhnVvnJOmCbuVSlNafL_aL5lTeGmuNWmo5zbj27cVtHrWJVzubuesWey7of-qqqkFyA0ph6TMakFdoc690jYjT9Iz_j75sA_j-bLQGseiZn9mqXwReiU7MAgEmZ-WmPEF0NNk',
  4.5, 18, false, '2026-01-22'
),
(
  'Sony WF-1000XM4 Earbuds', 'Audio',
  'Integrated Processor V1 delivers exceptional noise cancellation in true wireless earbuds.',
  228, null,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPHZamCmC3fIjJaQWdhY76lMMwFCiomL5tGp_eQPrUr2qCRJZtLEG28fEByHNTPGqeeEfvI-wDiF3XkKGrwNrfh8-pDDlBfeB0I4PfzR9sIAvJtxumATJ5saUsSbx4PVuczCECDLGH4NM4gF-uaB58nVvs9y3gq_MgTB8r9pzXMnbA945d_Gsan5suKcl8pG3kB1ZGV3wupBlA0b894raYrSS8i_QVv32Zuclnjflg8Vt2cce_Xe2kfc397Hk9ZnkzmKk0qJiL1yri',
  4.7, 88, false, '2025-10-18'
),
(
  'Apple AirPods Max - Silver', 'Audio',
  'High-fidelity audio, computational audio, active noise cancellation in over-ear form.',
  479, null,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDSokY8tx399xEj4Fi5Jh-qwV5Lp5btBGGrWNWobcEZwZbWRrF8M2-I1wTs9I3W5ZeTW1x8rHUZVDv0hDttXs5NfNSO7cXuVn6khzDtR04cp8L8X34A7LHTlvp5vKqXiF2doRHTlrhF4E_1gkKcjVil1VV6MY5oImS8JzkvCsuSt6EOtCfX3OxcrJ_UlE5S49pdesTM_KTV86xJ6-HhUxEhWYd08mxWFG2nRLOlW0Ysdt6ox6Idf3gj_dS_VDHtyXVb8uvy7dJASNfS',
  4.9, 12, false, '2025-09-01'
),
(
  'Minimalist Smart Watch', 'Tech',
  'Always-on display, GPS, 7-day battery. Currently out of stock.',
  299, null,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAggrkRt0szeW7W_O7rQ-6n6xUPArO9i4hSCBTjKghC7gBJqRbh5hqXE2RbH5iFR2EE4SszWJgxGE41ShVPKjLjnCRIhsIBU86cGSRVGSQ2_KmDdX5NjU7mwiXf_1HwpubPtj8qVBA3SWA8wGiDL91C6OXTB-xoZlWPpWfal41c3Qw45Zque0eu2zNZ1_sbs8DYwLOvlCsAZFYIq_Je7I1ouRIjy6iEJdG6Fy9O6cF6C-6lnPJD4MkD0Vrj2YG-y-k_j_rtnVHAgBUt',
  4.4, 0, false, '2025-08-12'
),
(
  'Acoustic Pro Headphones', 'Audio',
  'Studio-grade reference headphones with detachable cable and 50mm drivers.',
  349.50, null,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBXsyM_F1iXDsHi0-JTabELjmyJbC1JyrZreaUIMl0Mrr9nK-XM9uWyE4nrMGuT9KvFpHPzTPe0LHBlV2ODKMBcxdwDYr1ChtKU8rhaWkFPQGxpIgexPqnp1nf3_UF68nQagsL1pcMUS9vwuddelaDX12kArvhbSV_ho-pU0oFH5wsZ8KzzfTi0nguq_D5PW-JlMt8xMhcDqKhbum8yoq7-C-re9BOEPw897StjU-Gz3mMZHtUOOrN2mOam4sUDjr-QwrLP3S9icPWr',
  4.5, 40, false, '2026-03-18'
),
(
  'Standing Desk Pro', 'Seating',
  'Electric height adjustment, programmable presets, solid bamboo top. 350lb capacity.',
  799, 649,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCC1AonslET1XCy4vHcL9S6U4Lmp8E9ZdppeaDH1pcUMuuPUSctp2vOHia9zoI_RA9nlqTbmrNHieD-yaw0lynTKhLeEBYaKXr4dVIEXJzplIy0GzMT3PFO5s1n1rbQfICMkPiXsmjNhzt5qxPBrUsiboV0oQA-Vrcvm8loJIHXxfDSnoOKqRY0QQGdu21PeA0hgs6YQM30hEpAdyHk9_hZGIs61w00VVz_-FEY8x3PXq_YSWw9MhcBkKn6yg59ppxpoVYxBpwcBQNB',
  4.7, 15, false, '2026-04-10'
);
