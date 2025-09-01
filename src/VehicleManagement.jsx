import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Plus, Trash2, QrCode, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const VehicleManagement = ({ vehicles, onAddVehicle, onRemoveVehicle }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    type: 'car',
    brand: '',
    model: '',
    plate: '',
    color: '',
    year: ''
  });
  const { toast } = useToast();

  const vehicleTypes = [
    { value: 'car', label: 'Carro', icon: '🚗' },
    { value: 'motorcycle', label: 'Moto', icon: '🏍️' },
    { value: 'truck', label: 'Caminhão', icon: '🚚' },
    { value: 'van', label: 'Van', icon: '🚐' }
  ];

  const colors = [
    'Branco', 'Preto', 'Prata', 'Cinza', 'Azul', 'Vermelho', 
    'Verde', 'Amarelo', 'Marrom', 'Bege', 'Roxo', 'Laranja'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.brand || !formData.model || !formData.plate) {
      toast({
        title: "⚠️ Campos obrigatórios",
        description: "Por favor, preencha marca, modelo e placa",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (editingVehicle) {
      // Editar veículo existente
      toast({
        title: "🚧 Funcionalidade em desenvolvimento",
        description: "A edição de veículos será implementada em breve! 🚀",
        duration: 3000,
      });
    } else {
      // Adicionar novo veículo
      onAddVehicle(formData);
      setFormData({
        type: 'car',
        brand: '',
        model: '',
        plate: '',
        color: '',
        year: ''
      });
      setShowAddForm(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingVehicle(null);
    setFormData({
      type: 'car',
      brand: '',
      model: '',
      plate: '',
      color: '',
      year: ''
    });
    setShowAddForm(false);
  };

  const getVehicleIcon = (type) => {
    const typeData = vehicleTypes.find(t => t.value === type);
    return typeData ? typeData.icon : '🚗';
  };

  const generateQRCode = (vehicle) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "A geração de QR codes será implementada em breve! 🚀",
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Gestão de Veículos</h1>
          <p className="text-gray-400">Cadastre e gerencie seus carros e motos</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600 warning-glow"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Veículo
          </Button>
        </motion.div>
      </div>

      {/* Add/Edit Vehicle Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="traffic-card rounded-xl p-6 warning-glow"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-yellow-400">
                {editingVehicle ? 'Editar Veículo' : 'Adicionar Novo Veículo'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tipo de Veículo */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Veículo
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
                  >
                    {vehicleTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Marca */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Marca *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Ex: Toyota, Honda, Ford"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Modelo */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="Ex: Corolla, Civic, Focus"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Placa */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Placa *
                  </label>
                  <input
                    type="text"
                    name="plate"
                    value={formData.plate}
                    onChange={handleInputChange}
                    placeholder="Ex: ABC-1234"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Cor */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cor
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors"
                  >
                    <option value="">Selecione a cor</option>
                    {colors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                {/* Ano */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ano
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Ex: 2020"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600 warning-glow"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingVehicle ? 'Salvar Alterações' : 'Adicionar Veículo'}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Cancelar
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              className="vehicle-card traffic-card rounded-xl p-6 warning-glow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{getVehicleIcon(vehicle.type)}</div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-400">{vehicle.plate}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(vehicle)}
                    className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemoveVehicle(vehicle.id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {vehicle.color && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Cor:</span>
                    <span className="text-sm text-gray-300">{vehicle.color}</span>
                  </div>
                )}
                {vehicle.year && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Ano:</span>
                    <span className="text-sm text-gray-300">{vehicle.year}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">QR Code:</span>
                  <span className="text-sm text-yellow-400 font-mono">{vehicle.qrCode}</span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => generateQRCode(vehicle)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Gerar QR Code
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {vehicles.length === 0 && !showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Car className="w-12 h-12 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Nenhum veículo cadastrado
          </h3>
          <p className="text-gray-500 mb-6">
            Adicione seu primeiro veículo para começar a usar o QUERO SAIR
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600 warning-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Veículo
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VehicleManagement;