import React from 'react';
import Link from 'next/link';

export default function TechChallengePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-gray-900">
      <Link href="/" className="text-orange-600 hover:underline mb-8 inline-block">← Back to Home</Link>
      <h1 className="text-4xl font-bold mb-4 text-orange-700">2025 TECH CHALLENGE: PHOSPHATE EXTRACTION AND FERTILIZER PRODUCTION</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>The Phosphate challenge introduces participants to the critical processes involved in phosphate-based fertilizer production, a key industry for global agriculture. This challenge simulates the journey of phosphate from raw material extraction to processing and final shipping, highlighting the role of robotics in industrial automation. Participants will design and operate custom robots to streamline material handling, chemical processing, and product transport. This hands-on experience will develop problem-solving, engineering, and automation skills, essential for the future of industrial and environmental sustainability.</p>
      </section>
      <h2 className="text-2xl font-semibold mb-2">Background</h2>
      <p>Phosphate is a key ingredient in fertilizer, crucial for plant growth. The process starts in nature and ends up in the fields helping crops grow better.</p>
      <ul className="list-disc ml-6 mt-2">
        <li>Phosphate comes from phosphate rock, found underground in sedimentary rock layers. Open pit mining is the most common method for extracting phosphate rock.</li>
        <li>To turn raw phosphate rock into a form that plants can use, the rock is reacted with sulfuric acid to produce phosphoric acid, which is the base for most phosphate fertilizers.</li>
        <li>Ammonia is added to make different types of fertilizers such as MAP and DAP.</li>
        <li>The final product is dried, granulated, packaged, and shipped to boost soil phosphorus levels for better crop growth.</li>
      </ul>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">The Challenge</h2>
        <p>Using their own designs, teams will build robots that navigate and perform tasks in the phosphate production process. The challenge is divided into three key zones and stages:</p>
        <ol className="list-decimal ml-6 mt-2">
          <li>Mining Zone: Extracting phosphate rocks</li>
          <li>Mixing Zone: Chemical reaction and fertilizer formation</li>
          <li>Shipping Zone: Final sorting and transportation</li>
        </ol>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-orange-600">Objective 3: Transport & Ship Fertilizer (30 sec)</h2>
        <ul className="list-disc ml-6">
          <li>Move containers with fertilizer from the mixing zone to the correct area in the shipping zone: MAP (Yellow), DAP (Red), Unfinished (Orange).</li>
          <li>Scoring:
            <ul className="list-disc ml-6">
              <li>5 points for each correctly delivered container</li>
              <li>-3 points for placing a container in the wrong area</li>
            </ul>
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-orange-600">Additional Considerations</h2>
        <ul className="list-disc ml-6">
          <li>Game is continuous flow; sound signals next objective. Judges track scores and assess the field at the end.</li>
          <li>Teams may switch robot components during the challenge, but the timer does not stop.</li>
          <li>Robots must be built using only approved PARC competition parts.</li>
          <li>Teams must bring their robots to the competition and plan for transport.</li>
        </ul>
        <h3 className="text-lg font-bold mt-6 mb-2 text-orange-600">Revisions (4/11/2025):</h3>
        <ul className="list-disc ml-6">
          <li>Each team now has 4 containers (previously 6).</li>
          <li>Clarified that robots may move containers for easier reach in Objective 1.</li>
        </ul>
      </section>
    </div>
  );
} 