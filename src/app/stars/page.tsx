import React from 'react';
import Link from 'next/link';

export default function StarsChallengePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-gray-900">
      <Link href="/" className="text-orange-600 hover:underline mb-8 inline-block">← Back to Home</Link>
      <h1 className="text-4xl font-bold mb-4 text-orange-700">2025 STARS CHALLENGE: EV BATTERY MANUFACTURING</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>The rise of electric vehicles (EVs) is transforming the automotive industry, making efficient battery manufacturing and assembly essential. As demand for EVs grows, automation plays a crucial role in optimizing production, improving precision, and scaling operations. Robotics is at the heart of this evolution, streamlining processes that ensure high-quality, reliable battery systems.</p>
        <p className="mt-2">This challenge immerses participants in the world of advanced manufacturing, where they will design robots to tackle key steps in EV battery production. By integrating automation with engineering problem-solving, participants will gain valuable skills that are shaping the future of clean energy technology.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Background</h2>
        <p>In EV battery pack assembly, battery cells serve as the fundamental units for energy storage. These cells are combined to form a battery module, with the cells connected in series or parallel based on the desired configuration.</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Series assembly increases voltage.</li>
          <li>Parallel assembly boosts capacity.</li>
          <li>The battery module consists of the battery cells, housed in a battery case—the protective outer shell.</li>
          <li>Multiple battery modules are assembled to create the full battery pack, housed within a tray and cover for protection and support.</li>
        </ul>
        <p className="mt-2">AGVs (Automated Guided Vehicles) are often used in factories to autonomously transport materials, and collisions must be avoided to ensure safety.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">The Challenge</h2>
        <p>The PARC game challenge is a simplified and dramatized representation of the EV battery manufacturing process. Participants will design and build robots to automate critical EV battery production tasks, focusing on:</p>
        <ol className="list-decimal ml-6 mt-2">
          <li>Material Sorting: Identifying and organizing battery components.</li>
          <li>Series and Parallel Assembly: Arranging cells for optimal performance.</li>
          <li>Securing Batteries: Ensuring proper placement and connection.</li>
        </ol>
        <p className="mt-2">Participants must program and operate their designs using VEX V5 robots to complete these tasks efficiently, mimicking real-world manufacturing challenges. The competition tests technical skills and strategic thinking, preparing participants for the future of robotics in industry.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-orange-600">Objective 1: Setting Up Battery Structures (1 min 30s)</h2>
        <ul className="list-disc ml-6">
          <li>Robots must transport and assemble battery trays (foam bars) and battery cases (foam cubes) from storage to the assembly zone.</li>
          <li>Robots must avoid AGVs; alarm will sound if AGV is touched. -2 points per collision.</li>
          <li>Each team can make 3 structures from their storage; after that, they may take up to 2 trays and 4 cases from another team’s storage.</li>
          <li>Each tray correctly positioned: <b>3 points</b></li>
          <li>Each case correctly positioned: <b>1 point</b></li>
          <li>Disqualification if robot does not fit in 500mm x 500mm starting zone.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-orange-600">Objective 2: Sorting and Transporting Defective Battery Cells (1 min)</h2>
        <ul className="list-disc ml-6">
          <li>Defective batteries (blue blocks with red shapes) must be sorted into the correct recycling bin.</li>
          <li>Functional batteries can be moved but do not earn points; penalties for recycling them.</li>
          <li>Defective battery with a red X must remain in storage; recycling it is a -5 point penalty.</li>
          <li>Scoring:
            <ul className="list-disc ml-6">
              <li>Circle: 1 point</li>
              <li>Triangle: 2 points</li>
              <li>Square: 3 points</li>
              <li>Wrong bin: -1 point</li>
              <li>Functional battery in bin: -2 points</li>
              <li>Red X battery recycled: -5 points</li>
            </ul>
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-orange-600">Objective 3: Series and Parallel Assembly (2 min)</h2>
        <ul className="list-disc ml-6">
          <li>Robots arrange functional battery cells in series (row) or parallel (stacked).</li>
          <li>Series: 2 points per battery.</li>
          <li>Parallel: Each new layer increases points per battery (2, 3, 4, ...).</li>
          <li>Only cells that remain stacked at the end count.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-orange-600">Objective 4: Sealing Packs and Returning to Warehouse (30s)</h2>
        <ul className="list-disc ml-6">
          <li>Robots enclose battery structures with covers (foam bars) to form battery packs.</li>
          <li>Return to starting area after sealing packs.</li>
          <li>Each cover placed: <b>3 points</b></li>
          <li>Each robot back in starting area before time: <b>3 points</b></li>
          <li>Collisions with AGVs: -2 points each</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-orange-600">Additional Considerations</h2>
        <ul className="list-disc ml-6">
          <li>Robots must use only VEX V5 Kit parts.</li>
          <li>Teams must bring their robots to the competition.</li>
          <li>Game is continuous flow; sound signals next objective.</li>
          <li>Judges track scores and assess the field at the end.</li>
          <li>4 robots on the field at once; teams must not interfere with each other. Accidental knockdown: -5 points for offender, victim keeps points. Intentional sabotage: disqualification.</li>
          <li>Precision, strategy, and adaptability are key skills.</li>
        </ul>
      </section>
      <hr className="my-10" />
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2025 STARS CHALLENGE: FABRICATION DE BATTERIES VE (FRANÇAIS)</h2>
        <p>La montée en popularité des véhicules électriques (VE) transforme l'industrie automobile, rendant incontournables la fabrication et l'assemblage de batteries de qualité. À mesure que la demande de VE augmente, un grand rôle est désormais donné à l'automatisation dans l'optimisation de la production, l'amélioration de la précision et la mise à l'échelle des opérations. La robotique est au cœur de cette évolution, car elle rationnalise les processus qui garantissent la qualité et la fiabilité des systèmes de batteries.</p>
        <p className="mt-2">Ce défi plonge les participants dans le monde de la production manufacturière avancée, où ils concevront des robots capables de faire face aux étapes clés de la production de batteries pour véhicules électriques. En intégrant l'automatisation à la résolution de problèmes d'ingénierie, les participants acquerront des compétences précieuses qui façonneront le futur de la technologie des énergies propres.</p>
        <h3 className="text-xl font-bold mt-6 mb-2 text-orange-600">Contexte</h3>
        <p>Dans l'assemblage d'une batterie de véhicule électrique, les cellules de la batterie servent d'unités fondamentales pour le stockage de l'énergie. Ces cellules sont combinées pour former un module de batterie, avec les cellules connectées en série ou en parallèle sur la base de la configuration souhaitée.</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Montage en série augmente la tension.</li>
          <li>Montage en parallèle accroît la capacité.</li>
          <li>Le module de batterie se compose des cellules, logées dans une coque protectrice.</li>
          <li>Plusieurs modules sont assemblés pour former le bloc-batterie complet, logé dans un coffret et une coque pour la protection.</li>
        </ul>
        <p className="mt-2">Les VGA (véhicules à guidage automatisé) sont utilisés pour transporter les matériaux, et les collisions doivent être évitées.</p>
        <h3 className="text-xl font-bold mt-6 mb-2 text-orange-600">Le Défi</h3>
        <p>Ce défi de PARC est une représentation simplifiée du processus de fabrication des batteries de VE. Les participants devront concevoir et construire des robots pour automatiser les tâches essentielles, en se concentrant sur :</p>
        <ol className="list-decimal ml-6 mt-2">
          <li>Tri des matériaux</li>
          <li>Montage en série et en parallèle</li>
          <li>Sécurisation des batteries</li>
        </ol>
        <p className="mt-2">Les participants utiliseront des robots VEX V5 pour accomplir ces tâches efficacement, reflétant les défis réels de la fabrication. La compétition teste les compétences techniques et la réflexion stratégique.</p>
        <h3 className="text-xl font-bold mt-6 mb-2 text-orange-600">Objectif 1 : Mise en place des structures de la batterie (1 min 30s)</h3>
        <ul className="list-disc ml-6">
          <li>Transport et assemblage des coffrets (barres de mousse) et coques (cubes de mousse) de batterie.</li>
          <li>Éviter les VGA ; alarme en cas de collision. -2 points par collision.</li>
          <li>Chaque équipe peut fabriquer 3 structures de sa zone ; ensuite, elle peut prendre jusqu'à 2 coffrets et 4 coques d'une autre équipe.</li>
          <li>Coffret correctement positionné : <b>3 points</b></li>
          <li>Coque correctement positionnée : <b>1 point</b></li>
          <li>Disqualification si le robot ne tient pas dans la zone de départ 500mm x 500mm.</li>
        </ul>
        <h3 className="text-xl font-bold mt-6 mb-2 text-orange-600">Objectif 2 : Tri et transport des batteries défectueuses (1 min)</h3>
        <ul className="list-disc ml-6">
          <li>Les batteries défectueuses (blocs bleus avec formes rouges) doivent être triées dans la bonne poubelle de recyclage.</li>
          <li>Les batteries fonctionnelles peuvent être déplacées mais ne rapportent pas de points ; pénalités si recyclées.</li>
          <li>Batterie défectueuse avec un X rouge doit rester en stockage ; -5 points si recyclée.</li>
          <li>Répartition des points :
            <ul className="list-disc ml-6">
              <li>Cercle : 1 point</li>
              <li>Triangle : 2 points</li>
              <li>Carré : 3 points</li>
              <li>Mauvaise poubelle : -1 point</li>
              <li>Batterie fonctionnelle recyclée : -2 points</li>
              <li>Batterie X recyclée : -5 points</li>
            </ul>
          </li>
        </ul>
        <h3 className="text-xl font-bold mt-6 mb-2 text-orange-600">Objectif 3 : Montage en série et en parallèle (2 min)</h3>
        <ul className="list-disc ml-6">
          <li>Les robots agencent les cellules fonctionnelles en série (ligne) ou en parallèle (empilées).</li>
          <li>Série : 2 points par cellule.</li>
          <li>Parallèle : chaque nouvelle couche augmente les points par cellule (2, 3, 4, ...).</li>
          <li>Seules les cellules empilées à la fin comptent.</li>
        </ul>
        <h3 className="text-xl font-bold mt-6 mb-2 text-orange-600">Objectif 4 : Sceller les paquets et retour à l'entrepôt (30s)</h3>
        <ul className="list-disc ml-6">
          <li>Enfermer les structures avec des couvercles (barres de mousse) pour former des blocs de batteries.</li>
          <li>Retour à la zone de départ après avoir scellé les blocs.</li>
          <li>Couvercle placé : <b>3 points</b></li>
          <li>Robot revenu avant la fin : <b>3 points</b></li>
          <li>Collisions avec VGA : -2 points chacune</li>
        </ul>
        <h3 className="text-xl font-bold mt-6 mb-2 text-orange-600">Considérations additionnelles</h3>
        <ul className="list-disc ml-6">
          <li>Robots doivent utiliser uniquement les pièces du kit VEX V5.</li>
          <li>Les équipes doivent apporter leurs robots à la compétition.</li>
          <li>Jeu en rythme continu ; un son signale le prochain objectif.</li>
          <li>Juges suivent les scores et évaluent le terrain à la fin.</li>
          <li>4 robots sur le terrain ; pas d'interférence. Renversement accidentel : -5 points pour le fautif, la victime garde ses points. Sabotage intentionnel : disqualification.</li>
          <li>Précision, stratégie et adaptabilité sont essentielles.</li>
        </ul>
      </section>
    </div>
  );
} 