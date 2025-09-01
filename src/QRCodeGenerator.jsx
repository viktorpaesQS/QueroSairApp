import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, Printer as Print, Share2, Car, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const QRCodeGenerator = ({ vehicles }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const { toast } = useToast();

  const handleCopyCode = (qrCode) => {
    navigator.clipboard.writeText(qrCode);
    setCopiedCode(qrCode);
    setTimeout(() => setCopiedCode(null), 2000);
    
    toast({
      title: "📋 Código Copiado!",
      description: "QR Code copiado para a área de transferência",
      duration: 3000,
    });
  };

  const handleDownload = (vehicle) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "O download de QR codes será implementado em breve! 🚀",
      duration: 3000,
    });
  };

  const handlePrint = (vehicle) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "A impressão de QR codes será implementada em breve! 🚀",
      duration: 3000,
    });
  };

  const handleShare = (vehicle) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "O compartilhamento de QR codes será implementado em breve! 🚀",
      duration: 3000,
    });
  };

  const getVehicleIcon = (type) => {
    const icons = {
      car: '🚗',
      motorcycle: '🏍️',
      truck: '🚚',
      van: '🚐'
    };
    return icons[type] || '🚗';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1 
          className="text-3xl font-bold text-yellow-400 mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Gerador de QR Codes
        </motion.h1>
        <p className="text-gray-400">Crie códigos QR para seus veículos e garagens</p>
      </div>

      {vehicles.length === 0 ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <QrCode className="w-12 h-12 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Nenhum veículo cadastrado
          </h3>
          <p className="text-gray-500 mb-6">
            Você precisa cadastrar veículos antes de gerar QR codes
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600 warning-glow">
              <Car className="w-4 h-4 mr-2" />
              Cadastrar Veículo
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vehicle Selection */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="traffic-card rounded-xl p-6 warning-glow"
            >
              <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Selecionar Veículo
              </h2>
              <div className="space-y-3">
                {vehicles.map((vehicle) => (
                  <motion.button
                    key={vehicle.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedVehicle?.id === vehicle.id
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getVehicleIcon(vehicle.type)}</div>
                      <div className="flex-1">
                        <p className="font-medium text-white">
                          {vehicle.brand} {vehicle.model}
                        </p>
                        <p className="text-sm text-gray-400">{vehicle.plate}</p>
                        <p className="text-xs text-yellow-400 font-mono mt-1">
                          {vehicle.qrCode}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* QR Code Display */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="traffic-card rounded-xl p-6 warning-glow"
            >
              {selectedVehicle ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                      QR Code - {selectedVehicle.brand} {selectedVehicle.model}
                    </h2>
                    <p className="text-gray-400">Placa: {selectedVehicle.plate}</p>
                  </div>

                  {/* QR Code Visual */}
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="qr-code-pattern bg-white p-8 rounded-2xl"
                    >
                      <div className="w-48 h-48 bg-black rounded-lg flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* QR Code Info */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400">Código QR:</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopyCode(selectedVehicle.qrCode)}
                        className="p-2 bg-yellow-400/20 text-yellow-400 rounded-lg hover:bg-yellow-400/30 transition-colors"
                      >
                        {copiedCode === selectedVehicle.qrCode ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                    <p className="font-mono text-yellow-400 text-lg">
                      {selectedVehicle.qrCode}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={() => handleDownload(selectedVehicle)}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={() => handlePrint(selectedVehicle)}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                      >
                        <Print className="w-4 h-4 mr-2" />
                        Imprimir
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={() => handleShare(selectedVehicle)}
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartilhar
                      </Button>
                    </motion.div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-400 mb-2">
                      📋 Como usar o QR Code:
                    </h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Imprima o QR code e cole no vidro do veículo</li>
                      <li>• Outras pessoas podem escanear para enviar mensagens</li>
                      <li>• As mensagens são anônimas e temporárias</li>
                      <li>• Você receberá notificações em tempo real</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <QrCode className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Selecione um veículo
                  </h3>
                  <p className="text-gray-500">
                    Escolha um veículo da lista para gerar seu QR code
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Additional Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="traffic-card rounded-xl p-6 warning-glow"
      >
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">
          🚀 Funcionalidades Futuras
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">QR para Garagens</h3>
            <p className="text-sm text-gray-400">
              Gere códigos QR para portões e garagens privadas
            </p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">QR Personalizados</h3>
            <p className="text-sm text-gray-400">
              Customize cores e adicione logos aos seus QR codes
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QRCodeGenerator;