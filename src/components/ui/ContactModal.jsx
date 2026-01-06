import React, { useState } from 'react';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';

export default function ContactModal({ onClose }) {
  // --- CONFIGURATION ---
  // C'est ici que tu colleras ton lien n8n plus tard
  const WEBHOOK_URL = "https://n8n.collectifcobalt.eu/webhook-test/contact"; 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Projet Architecture', // Valeur par défaut
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulation si pas d'URL (pour tester le design)
    if (!WEBHOOK_URL) {
      setTimeout(() => setStatus('success'), 1500);
      return;
    }

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date().toLocaleDateString('fr-FR'), // On ajoute la date automatiquement
          source: 'Site Web Cobalt'
        }),
      });

      if (response.ok) {
        setStatus('success');
        // On remet le formulaire à zéro après 2 secondes ou on ferme ?
        // setTimeout(onClose, 3000); 
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="bg-[#0A0A0C] border border-white/20 p-12 max-w-md w-full text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-[#2433FF]" />
          </div>
          <h3 className="cobalt-heading text-3xl mb-4">Message Reçu</h3>
          <p className="text-gray-400 mb-8">
            Merci {formData.name}.<br/>
            Le collectif a bien reçu votre demande.<br/>
            Nous vous répondrons sous 48h.
          </p>
          <button onClick={onClose} className="cobalt-btn-primary w-full">
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      
      {/* Container principal */}
      <div className="bg-[#0A0A0C] w-full max-w-2xl border border-white/10 shadow-2xl relative flex flex-col md:flex-row overflow-hidden h-[80vh] md:h-auto">
        
        {/* BOUTON FERMER */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-md"
        >
          <X className="w-6 h-6" />
        </button>

        {/* COLONNE GAUCHE : INFOS */}
        <div className="w-full md:w-1/3 bg-[#0F0F11] p-8 border-r border-white/10 flex flex-col justify-between">
           <div>
              <span className="text-[#2433FF] font-bold text-xs uppercase tracking-widest mb-2 block">Contact</span>
              <h2 className="cobalt-heading text-3xl md:text-4xl mb-6">Parlons<br/>Projet.</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                 Une idée de rénovation ? Un meuble sur-mesure ? Ou simplement envie de discuter architecture ?
              </p>
           </div>
           
           <div className="space-y-4 text-sm text-gray-300">
              <div>
                 <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</span>
                 <a href="mailto:contact@collectifcobalt.com" className="hover:text-[#2433FF] transition-colors">contact@collectifcobalt.com</a>
              </div>
              <div>
                 <span className="block text-xs font-bold uppercase text-gray-500 mb-1">Studio</span>
                 <p>Biarritz & Bordeaux<br/>France</p>
              </div>
           </div>
        </div>

        {/* COLONNE DROITE : FORMULAIRE */}
        <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto">
           <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Choix du sujet (Radio buttons stylisés ou Select) */}
              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Sujet de la demande</label>
                 <div className="grid grid-cols-2 gap-3">
                    {['Projet Architecture', 'Atelier / Mobilier', 'Presse & Média', 'Autre'].map((opt) => (
                       <button
                         key={opt}
                         type="button"
                         onClick={() => setFormData({...formData, subject: opt})}
                         className={`text-xs border px-3 py-2 text-center uppercase tracking-wider transition-all
                           ${formData.subject === opt 
                             ? 'bg-[#2433FF] border-[#2433FF] text-white font-bold' 
                             : 'border-white/20 text-gray-400 hover:border-white hover:text-white'
                           }`}
                       >
                         {opt}
                       </button>
                    ))}
                 </div>
              </div>

              {/* Champs Texte */}
              <div className="space-y-6">
                 <div className="group relative">
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      className="block w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#2433FF] transition-colors peer"
                    />
                    <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#2433FF] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                       Votre Nom
                    </label>
                 </div>

                 <div className="group relative">
                    <input 
                      type="email" 
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" "
                      className="block w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#2433FF] transition-colors peer"
                    />
                    <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#2433FF] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                       Votre Email
                    </label>
                 </div>

                 <div className="group relative">
                    <textarea 
                      name="message" 
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=" "
                      className="block w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#2433FF] transition-colors peer resize-none"
                    ></textarea>
                    <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#2433FF] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                       Parlez-nous de votre projet...
                    </label>
                 </div>
              </div>

              {/* Message d'erreur */}
              {status === 'error' && (
                <div className="text-red-500 text-xs text-center bg-red-500/10 p-2 border border-red-500/20">
                   Une erreur est survenue. Veuillez réessayer ou nous écrire par email.
                </div>
              )}

              {/* Bouton Submit */}
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-[#2433FF] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Envoi...
                  </>
                ) : (
                  <>
                    Envoyer le message <Send className="w-4 h-4" />
                  </>
                )}
              </button>

           </form>
        </div>

      </div>
    </div>
  );
}