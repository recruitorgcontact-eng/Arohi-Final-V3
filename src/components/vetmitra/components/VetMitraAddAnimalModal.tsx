// Arohi VetMitra - Offline-Enabled Add / Register Animal Modal
// Allows farmers to add their own cattle, goats, dogs, or cats directly to local IndexedDB & LocalStorage

import React, { useState } from 'react';
import { X, Plus, Check, Camera, Sparkles } from 'lucide-react';
import { UniversalAnimalRecord } from '../data/mockAnimalsData';
import { VetSpecies, VetLanguage } from '../types';
import { VET_STOCK_IMAGES } from '../data/vetStockImages';

interface Props {
  language: VetLanguage;
  onSave: (animal: UniversalAnimalRecord) => void;
  onClose: () => void;
}

export const VetMitraAddAnimalModal: React.FC<Props> = ({
  language,
  onSave,
  onClose,
}) => {
  const isOdia = language === 'or';
  const [species, setSpecies] = useState<VetSpecies>('cattle');
  const [name, setName] = useState('');
  const [nameOdia, setNameOdia] = useState('');
  const [breed, setBreed] = useState('');
  const [tagNumber, setTagNumber] = useState(`OD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [ageYears, setAgeYears] = useState('3');
  const [weightKg, setWeightKg] = useState('380');
  const [milkYieldLDay, setMilkYieldLDay] = useState('10');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let photoUrl = VET_STOCK_IMAGES.cattleJersey;
    if (species === 'goat') photoUrl = VET_STOCK_IMAGES.goatPortrait;
    else if (species === 'dog') photoUrl = VET_STOCK_IMAGES.dogLabrador;
    else if (species === 'cat') photoUrl = VET_STOCK_IMAGES.catPortrait;

    const newAnimal: UniversalAnimalRecord = {
      id: `animal_${Date.now()}`,
      name: name.trim(),
      nameOdia: nameOdia.trim() || name.trim(),
      species,
      breed: breed.trim() || (species === 'cattle' ? 'Indigenous Cross' : species === 'goat' ? 'Black Bengal' : species === 'dog' ? 'Indie' : 'Domestic'),
      tagNumber: tagNumber.trim() || `TAG-${Date.now()}`,
      ageYears: Number(ageYears) || 3,
      weightKg: Number(weightKg) || (species === 'cattle' ? 380 : species === 'goat' ? 25 : species === 'dog' ? 22 : 4),
      photoUrl,
      status: 'Healthy & Registered',
      statusColor: 'emerald',
      milkYieldLDay: species === 'cattle' ? (Number(milkYieldLDay) || 0) : undefined,
      temperatureC: 38.5,
      appetite: 'Good',
      ruminationOrActivity: 'Normal',
      bodyConditionScore: 3.2,
      vaccinations: [
        { name: species === 'cattle' ? 'FMD (ଖୁରା ରୋଗ)' : species === 'goat' ? 'PPR' : 'Anti-Rabies', date: 'Just Added', status: 'up_to_date' },
      ],
      deworming: {
        lastDate: new Date().toLocaleDateString('en-GB'),
        dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
        dueInDays: 90,
        medicineName: 'Broad-spectrum Dewormer',
      },
      recentActivities: [
        { date: 'Today', title: 'Animal registered in Health Passport', category: 'treatment' },
      ],
      arohiInsight: {
        message: 'New animal health passport registered successfully. Monitor daily milk/feed and maintain records.',
        messageOdia: 'ପଶୁ ସ୍ୱାସ୍ଥ୍ୟ ପାସପୋର୍ଟ ସଫଳତାର ସହ ପଞ୍ଜୀକୃତ ହେଲା।',
        actionLabel: 'Check Animal Health',
        severity: 'info',
      }
    };

    onSave(newAnimal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-black">
                {isOdia ? 'ନୂତନ ପଶୁ ପଞ୍ଜୀକରଣ' : 'Register New Animal'}
              </h3>
              <p className="text-[11px] text-emerald-100 font-medium">
                {isOdia ? 'ସ୍ଥାନୀୟ ମେମୋରୀରେ ସଂରକ୍ଷିତ ହେବ (Offline Ready)' : 'Will be saved offline in local storage'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5 text-xs text-slate-800">
          {/* Species Selector */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">
              {isOdia ? 'ପଶୁ ପ୍ରଜାତି (Species)' : 'Animal Species'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'cattle', label: 'Cattle', odia: 'ଗାଈ/ମଇଁଷି', icon: '🐄' },
                { id: 'goat', label: 'Goat', odia: 'ଛେଳି', icon: '🐐' },
                { id: 'dog', label: 'Dog', odia: 'କୁକୁର', icon: '🐕' },
                { id: 'cat', label: 'Cat', odia: 'ବିରାଡ଼ି', icon: '🐈' },
              ].map((sp) => (
                <button
                  type="button"
                  key={sp.id}
                  onClick={() => setSpecies(sp.id as VetSpecies)}
                  className={`p-2 rounded-2xl border text-center transition-all ${
                    species === sp.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg block">{sp.icon}</span>
                  <span className="font-bold block text-[11px] mt-0.5">{isOdia ? sp.odia : sp.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Names */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isOdia ? 'ପଶୁଙ୍କ ନାମ (English)' : 'Animal Name (e.g. Ganga)'} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ganga / Basanti"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isOdia ? 'ନାମ (ଓଡ଼ିଆ)' : 'Name in Odia (optional)'}
              </label>
              <input
                type="text"
                value={nameOdia}
                onChange={(e) => setNameOdia(e.target.value)}
                placeholder="ଯଥା: ଗଙ୍ଗା / ବାସନ୍ତୀ"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Breed & Tag */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isOdia ? 'ନସଲ / ଜାତି (Breed)' : 'Breed'}
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder={species === 'cattle' ? 'Cross Jersey / Gir / Sahiwal' : 'Breed name'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isOdia ? 'ଟ୍ୟାଗ୍ ନମ୍ବର (Tag / ID)' : 'Ear Tag / Microchip ID'}
              </label>
              <input
                type="text"
                value={tagNumber}
                onChange={(e) => setTagNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Age & Weight */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isOdia ? 'ବୟସ (ବର୍ଷ)' : 'Age (Years)'}
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={ageYears}
                onChange={(e) => setAgeYears(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isOdia ? 'ଓଜନ (କିଲୋଗ୍ରାମ୍)' : 'Body Weight (kg)'}
              </label>
              <input
                type="number"
                min="1"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Cattle Milk Yield */}
          {species === 'cattle' && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isOdia ? 'ଦୈନିକ କ୍ଷୀର (ଲିଟର/ଦିନ)' : 'Daily Milk Yield (Liters/day)'}
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={milkYieldLDay}
                onChange={(e) => setMilkYieldLDay(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>{isOdia ? 'ପାସପୋର୍ଟ ସଂରକ୍ଷଣ କରନ୍ତୁ (Save Offline)' : 'Save Animal Passport (Offline)'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
