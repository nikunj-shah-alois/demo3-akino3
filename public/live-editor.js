(function () {
    // Wait for body to be available
    document.addEventListener('DOMContentLoaded', initLiveEditor);

    // If already loaded
    if (document.body) initLiveEditor();

    function initLiveEditor() {
        const urlParams = new URLSearchParams(window.location.search);
        const isEditMode = urlParams.get('liveEdit') === 'true';

        if (!isEditMode) return; // Exit if not in edit mode
        if (document.getElementById('live-editor-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'live-editor-btn';
        btn.innerHTML = '✏️ Enable Live Edit';
        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 20px',
            backgroundColor: '#1E1E1E',
            color: '#FFF',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '30px',
            cursor: 'pointer',
            zIndex: '999999',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            fontFamily: 'sans-serif'
        });

        let isEditing = false;

        btn.onclick = () => {
            isEditing = !isEditing;
            btn.innerHTML = isEditing ? '✅ Save & Exit Edit' : '✏️ Enable Live Edit';
            btn.style.backgroundColor = isEditing ? '#FF4A4A' : '#1E1E1E';

            const editables = document.querySelectorAll('[data-cms-node]');

            const handleSave = async (node, val) => {
                if (val === null || val === undefined) return;
                const key = node.getAttribute('data-cms-node');

                // Update Database Backend
                const pageId = window.__CMS_PAGE_ID__ || '674ec1a12345678900000001';
                const companyId = window.__CMS_COMPANY_ID__ || 'd167330ed87128df65b0442dz21';

                const response = await fetch('http://localhost:8088/service', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        request: {
                            endpoint: 'contentManager',
                            executor: 'liveUpdatePage',
                            data: {
                                pageId: pageId,
                                updates: { [key]: val }
                            },
                            metadata: {
                                company: { id: companyId }
                            }
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error(`Live update failed with status ${response.status}`);
                }

                const result = await response.json();
                if (result?.data?.[0]?.success === false) {
                    throw new Error(result?.data?.[0]?.error || 'Live update failed');
                }

                // Persist to local cache only after backend save succeeds.
                const overrides = JSON.parse(localStorage.getItem('cms_overrides') || '{}');
                overrides[key] = val;
                localStorage.setItem('cms_overrides', JSON.stringify(overrides));

                // Tell React to update state
                window.dispatchEvent(new CustomEvent('cms_update', { detail: { key, val } }));

                // Visual feedback
                node.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                setTimeout(() => node.style.backgroundColor = 'transparent', 300);
            };

            editables.forEach(node => {
                if (isEditing) {
                    node.style.outline = '2px dashed #FF4A4A';
                    node.style.outlineOffset = '4px';

                    if (node.tagName === 'INPUT' || node.tagName === 'BUTTON' || node.tagName === 'IMG') {
                        node.style.cursor = 'pointer';

                        // Prevent click action from triggering default logic (e.g., form submit)
                        node.onclick = async (e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            let currentVal, promptMsg;
                            if (node.tagName === 'INPUT') {
                                currentVal = (node.getAttribute('placeholder') || node.value);
                                promptMsg = "Enter new input text/placeholder:";
                            } else if (node.tagName === 'IMG') {
                                currentVal = node.getAttribute('src');
                                promptMsg = "Enter new image URL:";
                            } else {
                                currentVal = node.innerText;
                                promptMsg = "Enter new button text:";
                            }

                            const newVal = prompt(promptMsg, currentVal);

                            if (newVal !== null) {
                                if (node.tagName === 'IMG') node.src = newVal;
                                try {
                                    await handleSave(node, newVal);
                                } catch (error) {
                                    console.error(error);
                                    alert('Live edit save failed. The change was not persisted.');
                                }
                            }
                        };
                    } else {
                        node.setAttribute('contenteditable', 'true');
                        node.style.cursor = 'text';

                        node.onblur = async (e) => {
                            try {
                                await handleSave(node, e.target.innerText);
                            } catch (error) {
                                console.error(error);
                                alert('Live edit save failed. The change was not persisted.');
                            }
                        };
                    }
                } else {
                    node.style.outline = 'none';
                    node.style.cursor = 'default';

                    if (node.tagName === 'INPUT' || node.tagName === 'BUTTON' || node.tagName === 'IMG') {
                        node.onclick = null;
                    } else {
                        node.removeAttribute('contenteditable');
                        node.onblur = null;
                    }
                }
            });
        };

        btn.onmouseover = () => btn.style.transform = 'scale(1.05)';
        btn.onmouseout = () => btn.style.transform = 'scale(1)';

        document.body.appendChild(btn);
    }
})();
