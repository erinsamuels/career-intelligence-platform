"""Streamlit web interface for PathForge."""

import streamlit as st

st.set_page_config(
    page_title="PathForge",
    page_icon="🧭",
    layout="wide",
)

st.markdown(
    """
    <style>
    .main {
        background-color: #f8fafc;
    }
    .hero {
        padding: 2rem;
        border-radius: 18px;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        color: white;
        margin-bottom: 2rem;
    }
    .card {
        padding: 1.5rem;
        border-radius: 16px;
        background-color: white;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
        min-height: 150px;
    }
    .score {
        font-size: 3rem;
        font-weight: 800;
        color: #16a34a;
    }
    .muted {
        color: #64748b;
        font-size: 0.95rem;
    }
    .section-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 0.75rem;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

st.markdown(
    """
    <div class="hero">
        <h1>🧭 PathForge</h1>
        <h3>Navigate your career with confidence.</h3>
        <p>Upload your resume, choose your dream destination, and discover the paths others took to get there.</p>
    </div>
    """,
    unsafe_allow_html=True,
)

left, right = st.columns([2, 1])

with left:
    dream_company = st.selectbox(
        "Where do you want to end up?",
        ["Rivian", "Tesla", "Lucid", "SpaceX", "Apple", "BorgWarner", "Bosch"],
    )

with right:
    uploaded_resume = st.file_uploader(
        "Upload your resume",
        type=["txt", "pdf", "docx"],
    )

analyze = st.button("Analyze My Career", use_container_width=True)

if analyze:
    if uploaded_resume is None:
        st.warning("Please upload a resume first.")
    else:
        st.success("Resume uploaded successfully. Demo analysis shown below.")

        st.markdown('<div class="section-title">Your Path Dashboard</div>', unsafe_allow_html=True)

        c1, c2, c3 = st.columns(3)

        with c1:
            st.markdown(
                """
                <div class="card">
                    <div class="muted">Path Score</div>
                    <div class="score">88</div>
                    <strong>Strong trajectory</strong>
                    <p class="muted">You are aligned with early EV manufacturing paths.</p>
                </div>
                """,
                unsafe_allow_html=True,
            )

        with c2:
            st.markdown(
                """
                <div class="card">
                    <div class="muted">Best Career Match</div>
                    <h3>Sarah Chen</h3>
                    <strong>Manufacturing Engineer</strong>
                    <p class="muted">Shared manufacturing, CAD, and root-cause background.</p>
                </div>
                """,
                unsafe_allow_html=True,
            )

        with c3:
            st.markdown(
                """
                <div class="card">
                    <div class="muted">Recommended Next Step</div>
                    <h3>BorgWarner</h3>
                    <strong>Manufacturing Engineering</strong>
                    <p class="muted">Strong stepping-stone toward EV OEM roles.</p>
                </div>
                """,
                unsafe_allow_html=True,
            )

        st.markdown('<div class="section-title">Career Timeline</div>', unsafe_allow_html=True)
        st.write("Virginia Tech → HEVT → DuPont → ? → " + dream_company)

        st.markdown('<div class="section-title">Top Skill Gaps</div>', unsafe_allow_html=True)
        st.write("• DFMEA")
        st.write("• APQP")
        st.write("• Battery Manufacturing")

        st.markdown('<div class="section-title">Recommended Actions</div>', unsafe_allow_html=True)
        st.write("✓ Learn DFMEA fundamentals")
        st.write("✓ Explore Tier 1 automotive suppliers")
        st.write("✓ Connect with alumni in EV manufacturing")
else:
    st.info("Upload a resume and choose a dream company to begin.")